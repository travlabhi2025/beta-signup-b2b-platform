import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.otp || !data.userId || !data.email || !data.otpData) {
      return NextResponse.json(
        { error: "Missing required fields: otp, userId, email, and otpData" },
        { status: 400 }
      );
    }

    // Verify OTP from client-provided data
    // The client reads this from Firestore and sends it for validation
    const otpData = data.otpData;

    // Check if OTP has expired
    const expiresAt = new Date(otpData.expiresAt);
    if (expiresAt < new Date()) {
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify email matches
    if (otpData.email !== data.email) {
      return NextResponse.json(
        { error: "Email mismatch." },
        { status: 400 }
      );
    }

    // Verify OTP
    if (otpData.otp !== data.otp) {
      return NextResponse.json(
        { error: "Invalid OTP. Please check and try again." },
        { status: 400 }
      );
    }

    // Update Google Sheets (non-blocking)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
      const sheetsResponse = await fetch(
        `${baseUrl}/api/update-sheets-email-verified`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: data.userId,
            email: data.email,
            emailVerified: true,
          }),
        }
      );

      if (!sheetsResponse.ok) {
        const errorText = await sheetsResponse.text();
        console.error("Failed to update Google Sheets:", {
          status: sheetsResponse.status,
          statusText: sheetsResponse.statusText,
          error: errorText,
          userId: data.userId,
          email: data.email,
        });
      } else {
        const result = await sheetsResponse.json();
        if (!result.success) {
          console.error("Google Sheets update returned error:", result.error);
        } else {
          console.log("Google Sheets updated successfully for:", data.userId);
        }
      }
    } catch (sheetsError) {
      console.error("Error updating Google Sheets:", {
        error: sheetsError instanceof Error ? sheetsError.message : String(sheetsError),
        userId: data.userId,
        email: data.email,
      });
      // Don't fail verification if Sheets update fails
    }

    // Delete OTP after successful verification (optional - you can keep it for audit)
    // await deleteDoc(otpRef);

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

