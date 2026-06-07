import { connectDB } from "@/db/connectDB"
import resumeModel from "@/models/resume.model";
import axios from "axios";
import mammoth from "mammoth";
import { NextResponse } from "next/server";
import { requireSession, requireOwnership } from "@/lib/auth-guard";

function isTrustedResumeUrl(value) {
    if (typeof value !== "string" || value.trim().length === 0) {
        return false;
    }

    try {
        const parsed = new URL(value);
        if (parsed.protocol !== "https:") {
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
        const auth = await requireSession();
        if (auth.error) return auth.error;
        const { session } = auth;

        await connectDB();

        const { searchParams } = new URL(req.url);
        const resumeId = searchParams.get("id");

        const resumeRecord = await resumeModel.findById(resumeId);

        if (!resumeRecord) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        const ownershipCheck = requireOwnership(session, resumeRecord.userEmail);
        if (ownershipCheck.error) return ownershipCheck.error;

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
