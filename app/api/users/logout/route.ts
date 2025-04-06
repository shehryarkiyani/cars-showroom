/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";

connectDb();

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "User logout successfully",
      status: 200,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
