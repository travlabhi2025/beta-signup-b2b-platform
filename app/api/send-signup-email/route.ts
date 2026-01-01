import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.email || !data.firstName || !data.lastName) {
      return NextResponse.json(
        { error: "Missing required fields: email, firstName, and lastName" },
        { status: 400 }
      );
    }

    // Only send email if API key is configured
    if (!process.env.RESEND_API_KEY) {
      // Return success even if not configured (non-blocking)
      return NextResponse.json({ success: true });
    }

    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const verifyEmailUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      request.headers.get("origin") ||
      "https://b2b.tripabhi.in";

    try {
      await resend.emails.send({
        from: "TripAbhi <noreply@hi.travlabhi.com>",
        to: data.email,
        subject: "Welcome to TripAbhi Organizer Beta - Verify Your Email",
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
                
                <div style="background-color: white; padding: 24px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #0daf9f;">
                  <h2 style="color: #112838; font-size: 20px; margin-bottom: 12px; margin-top: 0;">🚀 You're One Step Closer to Beta Access</h2>
                  <p style="font-size: 16px; margin-bottom: 16px; color: #112838;">
                    Verifying your email address gets you one step closer to accessing the beta platform. This helps us ensure the best experience for our beta partners and maintain platform security.
                  </p>
                  <p style="font-size: 16px; margin-bottom: 0; color: #112838;">
                    Once verified, you'll be able to access all beta features and start managing your travel operations with ease.
                  </p>
                </div>
                
                <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 24px 0; text-align: center;">
                  <p style="font-size: 14px; color: #666; margin-bottom: 12px;">
                    Ready to verify your email?
                  </p>
                  <a href="${verifyEmailUrl}/verify-email" style="display: inline-block; background-color: #0daf9f; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                    Verify Your Email
                  </a>
                </div>
                
                <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 24px 0;">
                  <h2 style="color: #112838; font-size: 20px; margin-bottom: 16px; margin-top: 0;">What Happens Next:</h2>
                  <ol style="padding-left: 20px; margin: 0;">
                    <li style="margin-bottom: 12px;">
                      <strong>Verify Your Email:</strong> Click the button above to sign in and verify your email address.
                    </li>
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

