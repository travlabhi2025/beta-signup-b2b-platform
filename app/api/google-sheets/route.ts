import { NextRequest, NextResponse } from "next/server";

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL || "";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.phoneNumber ||
      !data.companyName ||
      !data.tripsPerYear ||
      !data.userId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send to Google Sheets (if URL is configured)
    if (GOOGLE_SCRIPT_URL) {
      try {
        const payload: {
          firstName: string;
          lastName: string;
          email: string;
          phoneNumber: string;
          companyName: string;
          tripsPerYear: string;
          userId: string;
          token?: string;
        } = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          companyName: data.companyName,
          tripsPerYear: data.tripsPerYear,
          userId: data.userId,
        };

        // Add token if configured (optional security)
        if (process.env.NEXT_PUBLIC_GOOGLE_SHEETS_TOKEN) {
          payload.token = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_TOKEN;
        }

        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const responseText = await response.text();

        if (!response.ok) {
          return NextResponse.json(
            {
              success: false,
              error: `Google Sheets API error: ${response.statusText} - ${responseText}`,
            },
            { status: response.status }
          );
        }

        let result;
        try {
          result = JSON.parse(responseText);
        } catch {
          result = { success: true, message: responseText };
        }

        if (!result.success) {
          return NextResponse.json(
            {
              success: false,
              error: result.error || "Failed to save to Google Sheets",
            },
            { status: 500 }
          );
        }

        return NextResponse.json({ success: true });
      } catch (error) {
        return NextResponse.json(
          {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to send to Google Sheets",
          },
          { status: 500 }
        );
      }
    } else {
      // If Google Sheets URL is not configured, return success anyway (non-blocking)
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

