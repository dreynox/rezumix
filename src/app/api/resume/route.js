import { NextResponse } from "next/server";
import { connectDB } from "@/db/connectDB";
import Resume from "@/models/resume.model";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Connect to MongoDB
    await connectDB();

    // Get data from frontend
    const body = await req.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
    }

    if (typeof body.resumeUrl === "string" && body.resumeUrl.trim().length > 0) {
      return NextResponse.json(
        { success: false, message: "resumeUrl cannot be set by clients" },
        { status: 400 }
      );
    }

    const { userEmail: _userEmail, resumeUrl: _resumeUrl, ...resumeData } = body;

    // Save resume in database
    const resume = await Resume.create({
      ...resumeData,
      userEmail: session.user.email,
    });

    return NextResponse.json({
      success: true,
      message: "Resume saved successfully",
      resume,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}