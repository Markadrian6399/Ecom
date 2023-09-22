import nodemailer from "nodemailer";
import { google } from "googleapis";

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URL = process.env.REDIRECT_URL;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const CLIENT_ID =
  "497050094577-rii44m6v9cjhi7vnsan3rru0rjteluke.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04zWf0cVmF8XTCgYIARAAGAQSNwF-L9IrGjtxNuZcJzmjMI-MNP7WPoblDkw22MCVCeHV-FNJkNzgtOGXsMXpl-3DN8sOcg3y0NI";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});
export async function sendEmail(request, response, next) {
  try {
    // const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken:
          "ya29.a0AWY7CklQ5yOpogd_nXC0cBrhZwU12U-pwJnJdhmAXduoxzTrES19FkSICeEJECy08jTBtFSjJPo5-Z5GPr5qEhSunBIfmYfJXF44Bheda8-LG9iI1jsJT19A0tdKn6KIGPFjgetOzY46l4YOEyPlYOksgsT3aCgYKAdwSARISFQG1tDrpyy65qHSZMcA7Xrzl66h_LQ0163",
        // accessToken: accessToken,
      },
    });
    request.transport = transport;
    response.status(200).json({ message: "Message sent" });
    next();
  } catch (error) {
    return console.log(error);
  }
}
