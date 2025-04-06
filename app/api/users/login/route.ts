/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    const comparePassword = await bcryptjs.compare(password, user.password);
    if (!comparePassword) {
      return NextResponse.json({ error: "Wrong password" }, { status: 400 });
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    const response = NextResponse.json(
      { message: "User logged in successfully", accessToken: token },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
