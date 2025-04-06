/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connectDb();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select(
      "-password -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry"
    );

    return NextResponse.json(
      { message: "User retrieved successfully", data: user },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
