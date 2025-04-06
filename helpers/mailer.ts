/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

const verifyEmailTemplates = (token: string) => {
  return `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${token}">here</a> to verify your email</p>`;
};
const resetPasswordEmailTemplates = (token: string) => {
  return `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${token}">here</a> to reset your password</p>`;
};
export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: any;
  emailType: any;
  userId: any;
}) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000, //1hour
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000, //1hour
        },
      });
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_USER_PASSWORD,
      },
    });
    const mailOptions = {
      from: "shehryarkiani121@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      html:
        emailType === "VERIFY"
          ? verifyEmailTemplates(hashedToken)
          : resetPasswordEmailTemplates(hashedToken), // html body
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (err: any) {
    throw new Error(err);
  }
};
