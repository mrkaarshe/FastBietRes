import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // hubi in .env la akhriyey

// ✅ samee transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL || "odaykaarshe@gmail.com",
    pass: process.env.SENDER_EMAIL_PASSWORD || "scbn ugoj cgvp gjof", // magaca saxda ah
  },
});

// ✅ function diraya email (async version)
export const SendMyEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", mailOptions.to);
    console.log("📨 Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);

    // Gmail-specific error debugging
    if (error.message.includes("535-5.7.8")) {
      console.error(
        "⚠️  Invalid Gmail login. Hubi App Password-ka (Google App Password) iyo environment variables-ka."
      );
    } else if (error.code === "EAUTH") {
      console.error("⚠️  Authentication error: Username or password invalid.");
    } else if (error.code === "ENOTFOUND") {
      console.error("⚠️  Network error: SMTP server not found.");
    }

    throw new Error(error.message);
  }
};

export default transporter;
