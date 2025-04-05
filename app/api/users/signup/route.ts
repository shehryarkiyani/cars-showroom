/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      email,
      username,
      password: hashPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    //Send Email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json({ message: "User register successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
