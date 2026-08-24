import { NextResponse } from "next/server";

export const dynamic = "force-static";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sms6458921";
const COOKIE_NAME = "admin_authenticated";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const isAuthenticated = cookieHeader.includes(`${COOKIE_NAME}=true`);
  return NextResponse.json({ authenticated: isAuthenticated });
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true, message: "Logged in successfully" });
      response.cookies.set(COOKIE_NAME, "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return response;
    }

    return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
