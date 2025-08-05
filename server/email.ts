import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

console.log("SendGrid API Key length:", process.env.SENDGRID_API_KEY.length);
console.log(
  "SendGrid API Key starts with:",
  process.env.SENDGRID_API_KEY.substring(0, 10),
);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface ContactEmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactNotification(
  params: ContactEmailParams,
): Promise<boolean> {
  console.log("Attempting to send email notification...");
  console.log("Email params:", {
    name: params.name,
    email: params.email,
    subject: params.subject,
  });

  try {
    // Using your verified SendGrid sender identity
    const emailContent = {
      to: "nithinganiga959@gmail.com", // Your email address
      from: "nithinganiga959@gmail.com", // Your verified sender in SendGrid
      reply_to: params.email, // This allows you to reply directly to the sender
      subject: `Portfolio Contact: ${params.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${params.name}</p>
            <p><strong>Email:</strong> ${params.email}</p>
            <p><strong>Subject:</strong> ${params.subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #1e293b; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #475569;">${params.message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #1e40af;">
              <strong>Reply to:</strong> ${params.email}
            </p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${params.name}
        Email: ${params.email}
        Subject: ${params.subject}
        
        Message:
        ${params.message}
        
        Reply to: ${params.email}
      `,
    };

    console.log(
      "Sending email with content:",
      JSON.stringify(
        {
          to: emailContent.to,
          from: emailContent.from,
          subject: emailContent.subject,
        },
        null,
        2,
      ),
    );

    const response = await sgMail.send(emailContent);
    console.log("SendGrid response:", response);
    console.log("Contact notification email sent successfully");
    return true;
  } catch (error: any) {
    console.error("SendGrid email error:", error);
    if (error.response?.body?.errors) {
      console.error(
        "SendGrid error details:",
        JSON.stringify(error.response.body.errors, null, 2),
      );
    }
    return false;
  }
}
