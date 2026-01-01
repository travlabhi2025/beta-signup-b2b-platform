import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// OTP expires in 10 minutes
const OTP_EXPIRY_MINUTES = 10;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.email || !data.userId) {
      return NextResponse.json(
        { error: "Missing required fields: email and userId" },
        { status: 400 }
      );
    }

    // Only send email if API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Return OTP data for client to store in Firestore
    // The client will store this in Firestore with proper security rules
    const otpData = {
      otp: otp,
      expiresAt: new Date(
        Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
      ).toISOString(),
      email: data.email,
    };

    try {
      // Send OTP email
      await resend.emails.send({
        from: "TripAbhi <noreply@hi.travlabhi.com>",
        to: data.email,
        subject: "Verify your email - TripAbhi Organizer Beta",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #112838; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: #f6f8f8; padding: 40px 20px; border-radius: 8px;">
                <h1 style="color: #0daf9f; font-size: 28px; margin-bottom: 20px;">Verify Your Email</h1>
                
                <p style="font-size: 16px; margin-bottom: 16px;">
                  Please use the following code to verify your email address:
                </p>
                
                <div style="background-color: white; padding: 30px; border-radius: 8px; margin: 24px 0; text-align: center;">
                  <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #0daf9f; font-family: monospace;">
                    ${otp}
                  </div>
                </div>
                
                <p style="font-size: 14px; color: #666; margin-bottom: 16px;">
                  This code will expire in ${OTP_EXPIRY_MINUTES} minutes.
                </p>
                
                <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 24px 0; text-align: center;">
                  <p style="font-size: 14px; color: #666; margin-bottom: 12px;">
                    Or verify on any device by clicking the link below:
                  </p>
                  <a href="${
                    process.env.NEXT_PUBLIC_APP_URL ||
                    request.headers.get("origin") ||
                    "https://b2b.tripabhi.in"
                  }/verify-email" style="display: inline-block; background-color: #0daf9f; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
                    Verify Email
                  </a>
                </div>
                
                <p style="font-size: 14px; color: #666; margin-top: 32px;">
                  If you didn't request this code, you can safely ignore this email.
                </p>
                
                <p style="font-size: 16px; margin-top: 32px;">
                  Best regards,<br>
                  <strong>The TripAbhi Team</strong>
                </p>
              </div>
            </body>
          </html>
        `,
      });

      // Return OTP data so client can store it in Firestore
      // Note: In production, you might want to hash the OTP before returning
      return NextResponse.json({
        success: true,
        otpData: otpData, // Client will store this in Firestore
      });
    } catch (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        {
          success: false,
          error:
            error instanceof Error ? error.message : "Failed to send email",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
