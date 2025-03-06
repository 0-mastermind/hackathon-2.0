import { google } from "googleapis";
import { createTransport } from "nodemailer";

const OAuth2 = google.auth.OAuth2;

// Creating a transporter
const createTransporter = async () => {
  // Setting up google auth
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  // Generating new access token
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((error, token) => {
      if (error) {
        reject("Failed to create access token");
      }
      resolve(token);
    });
  });

  // Nodemailer transporter setup
  const transporter = createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_EMAIL_ID,
      accessToken,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });

  return transporter;
};

const sendVerificationMail = async (name, email, token, id) => {
  let emailTransporter = await createTransporter();

  const verificationLink = `${process.env.BACKEND_BASE_URI}/api/users/verify?id=${id}&token=${token}`;

  let body = `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            ${verificationLink}
        </div>`;

  let emailOptions = {
    subject: "Verification Email",
    to: email,
    from: process.env.GOOGLE_EMAIL_ID,
    html: body,
  };

  try {
    const info = await emailTransporter.sendMail(emailOptions);
    console.log("Verification email sent: ", info.response);
  } catch (error) {
    console.log("Error while sendind email:", error);
  }
};

export { sendVerificationMail };
