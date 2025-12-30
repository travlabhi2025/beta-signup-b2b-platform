import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.email || !data.firstName || !data.lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Only send email if API key is configured
    if (!process.env.RESEND_API_KEY) {
      // Return success even if not configured (non-blocking)
      return NextResponse.json({ success: true });
    }

    const fullName = `${data.firstName} ${data.lastName}`.trim();

    try {
      await resend.emails.send({
        from: "TripAbhi <noreply@hi.travlabhi.com>",
        to: data.email,
        subject: "Welcome to TripAbhi Organizer Beta!",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #112838; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: #f6f8f8; padding: 40px 20px; border-radius: 8px;">
                <h1 style="color: #0daf9f; font-size: 28px; margin-bottom: 20px;">Welcome to TripAbhi Organizer Beta!</h1>
                
                <p style="font-size: 16px; margin-bottom: 16px;">Hi ${fullName},</p>
                
                <p style="font-size: 16px; margin-bottom: 16px;">
                  Thank you for signing up for the TripAbhi Organizer Beta program! We're excited to have you join our community of travel professionals.
                </p>
                
                <p style="font-size: 16px; margin-bottom: 16px;">
                  We're currently reviewing applications to ensure the best experience for our beta partners. Here's what happens next:
                </p>
                
                <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 24px 0;">
                  <h2 style="color: #112838; font-size: 20px; margin-bottom: 16px;">What's Next:</h2>
                  <ol style="padding-left: 20px; margin: 0;">
                    <li style="margin-bottom: 12px;">
                      <strong>Application Review:</strong> We'll manually check your travel organization profile to match you with the right beta cohort tailored to your niche.
                    </li>
                    <li style="margin-bottom: 12px;">
                      <strong>Rolling Access:</strong> We grant platform access in weekly batches. This helps us maintain stability and ensure every new user gets attention.
                    </li>
                    <li style="margin-bottom: 12px;">
                      <strong>Onboarding Support:</strong> Selected partners receive a complimentary 1:1 strategy call to set up workflows and integrate existing data.
                    </li>
                  </ol>
                </div>
                
                <p style="font-size: 16px; margin-bottom: 16px;">
                  We'll be in touch soon with next steps. In the meantime, if you have any questions, feel free to reach out to us at <a href="mailto:connect@travlabhi.com" style="color: #0daf9f; text-decoration: none;">connect@travlabhi.com</a>.
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

      return NextResponse.json({ success: true });
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
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
