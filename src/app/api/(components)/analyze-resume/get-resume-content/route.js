import { connectDB } from "@/db/connectDB"
import resumeModel from "@/models/resume.model";
import axios from "axios";
import mammoth from "mammoth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

function isTrustedResumeUrl(value) {
    if (typeof value !== "string" || value.trim().length === 0) {
        return false;
    }

    try {
        const parsed = new URL(value);
        if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
            return false;
        }

        return parsed.hostname === "cloudinary.com" || parsed.hostname.endsWith(".cloudinary.com");
    } catch {
        return false;
    }
}

function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function textToHtml(value) {
    return `<div style="white-space: pre-wrap;">${escapeHtml(value)}</div>`;
}

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const { searchParams } = new URL(req.url);
        const resumeId = searchParams.get("id");

        const resumeRecord = await resumeModel.findById(resumeId);

        if (!resumeRecord) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        if (resumeRecord.userEmail !== session.user.email) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        if (typeof resumeRecord.resumeText === "string" && resumeRecord.resumeText.trim().length > 0) {
            return NextResponse.json({
                success: true,
                resumeHtml: textToHtml(resumeRecord.resumeText),
            });
        }

        const fileUrl = resumeRecord.resumeUrl;
        if (!isTrustedResumeUrl(fileUrl)) {
            return NextResponse.json({ message: "Unsupported resume source" }, { status: 400 });
        }

        const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
        const buffer = Buffer.from(response.data);
        const result = await mammoth.convertToHtml({ buffer });

        return NextResponse.json({ success: true, resumeHtml: result.value });

    } catch (error) {
        console.error("error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
