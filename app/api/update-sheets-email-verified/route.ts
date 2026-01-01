import { NextRequest, NextResponse } from "next/server";

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL || "";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.userId || !data.email || data.emailVerified === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: userId, email, and emailVerified" },
        { status: 400 }
      );
    }

    // Send to Google Sheets (if URL is configured)
    if (GOOGLE_SCRIPT_URL) {
      try {
        const payload: {
          userId: string;
          email: string;
          emailVerified: boolean;
          action: "updateEmailVerified";
          token?: string;
        } = {
          userId: data.userId,
          email: data.email,
          emailVerified: data.emailVerified,
          action: "updateEmailVerified",
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
          console.error("Google Sheets API error:", {
            status: response.status,
            statusText: response.statusText,
            responseText,
            payload: { ...payload, token: payload.token ? "***" : undefined },
          });
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
          console.warn("Failed to parse Google Sheets response as JSON:", responseText);
          result = { success: true, message: responseText };
        }

        if (!result.success) {
          console.error("Google Sheets update failed:", {
            error: result.error,
            payload: { ...payload, token: payload.token ? "***" : undefined },
          });
          return NextResponse.json(
            {
              success: false,
              error: result.error || "Failed to update Google Sheets",
            },
            { status: 500 }
          );
        }

        console.log("Google Sheets updated successfully:", {
          userId: data.userId,
          email: data.email,
          emailVerified: data.emailVerified,
        });

        return NextResponse.json({ success: true });
      } catch (error) {
        return NextResponse.json(
          {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to update Google Sheets",
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

