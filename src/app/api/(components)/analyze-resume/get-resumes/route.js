import { connectDB } from "@/db/connectDB"
import resumeModel from "@/models/resume.model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const resumeRecords = await resumeModel.find({ userEmail: session.user.email });

        return NextResponse.json({
            success: true,
            userResumes: resumeRecords.map(r => ({
                id: r._id,
                resumeUrl: r.resumeUrl
            }))
        }, { status: 200 });

    } catch (error) {
        console.error("error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
