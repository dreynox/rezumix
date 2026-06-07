import { connectDB } from "@/db/connectDB"
import resumeModel from "@/models/resume.model";
import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth-guard";

export async function GET(req) {
    try {
        const auth = await requireSession();
        if (auth.error) return auth.error;
        const { session } = auth;

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
