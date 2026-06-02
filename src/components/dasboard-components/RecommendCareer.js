"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ArrowRight,
    Loader2,
    Sparkles,
    Compass,
    UserCircle,
    Lightbulb
} from "lucide-react";
import { FetchErrorBanner } from "@/components/ui/fetch-error-banner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { marked } from "marked";

// Background Component
const GridBackground = () => (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-amber-600/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-full h-[60vh] bg-orange-600/5 blur-[120px] rounded-full mix-blend-screen" />
    </div>
);

export default function RecommendCareer() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        userFullName: "",
        skills: "",
        interests: "",
        preferredWorkEnvironment: "",
        timeCommitment: "",
    });
    const [aiRecommendation, setAiRecommendation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Auto-scroll to results
    const resultsRef = useRef(null);

    useEffect(() => {
        if (status === "loading") return
        if (!session || status === "unauthenticated") router.push("/");
    }, [session, status, router]);

    // Auto-scroll when data starts streaming
    useEffect(() => {
        if (aiRecommendation && resultsRef.current && loading) {
            // Optional: Smooth scroll to results as they appear
            // resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [aiRecommendation, loading]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const runRecommendation = async () => {
        setLoading(true);
        setAiRecommendation("");
        setError("");

        try {
            const skillsArray = formData.skills.split(",").map((skill) => skill.trim());
            const interestsArray = formData.interests.split(",").map((interest) => interest.trim());
            const updatedFormData = { ...formData, skills: skillsArray, interests: interestsArray };

            const response = await fetch(`/api/recommend-career`, {
                method: "POST",
                body: JSON.stringify({ formData: updatedFormData })
            });

            if (!response.ok) throw new Error(response.statusText);

            // Stream Handling
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n");

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            // Real-time State Update
                            setAiRecommendation((prev) => prev + data.content);
                        } catch (e) {
                            console.error("Error parsing JSON chunk", e);
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setError(error.message || "Failed to generate career recommendation. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        runRecommendation();
    };

    const renderMarkdown = (markdown) => {
        if (!markdown) return { __html: '' };
        marked.setOptions({ breaks: true, gfm: true });
        return { __html: marked(markdown) };
    };

    if (status === "loading") return null;

    return (
        <div className="relative min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-amber-500/30 overflow-x-hidden">
            <GridBackground />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20">
                                <Compass size={24} />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                Career Path
                            </h1>
                        </div>
                        <p className="text-slate-400 text-lg">
                            Let&apos;s discover a path tailored to your unique strengths.
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-amber-950/20 rounded-full border border-amber-900/30">
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-amber-200">AI Analyst Ready</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* LEFT SIDE: The Form Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-xl sticky top-8">
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 border border-amber-500/20">
                                    <UserCircle size={22} />
                                </div>
                                <h3 className="font-semibold text-white">Your Profile</h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <Label className="text-slate-300 text-sm font-medium">Full Name</Label>
                                    <Input
                                        required
                                        name="userFullName"
                                        placeholder="e.g. Alex Morgan"
                                        value={formData.userFullName}
                                        onChange={handleChange}
                                        className="bg-[#111] border-white/10 text-white focus:border-amber-500/50 focus:ring-amber-500/20 rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-slate-300 text-sm font-medium">Weekly Hours</Label>
                                    <Input
                                        required
                                        type="number"
                                        name="timeCommitment"
                                        placeholder="40"
                                        value={formData.timeCommitment}
                                        onChange={handleChange}
                                        className="bg-[#111] border-white/10 text-white focus:border-amber-500/50 focus:ring-amber-500/20 rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-slate-300 text-sm font-medium">Top Skills</Label>
                                    <Input
                                        required
                                        name="skills"
                                        placeholder="Coding, Writing, Sales..."
                                        value={formData.skills}
                                        onChange={handleChange}
                                        className="bg-[#111] border-white/10 text-white focus:border-amber-500/50 focus:ring-amber-500/20 rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-slate-300 text-sm font-medium">Interests</Label>
                                    <Input
                                        required
                                        name="interests"
                                        placeholder="Tech, Art, Nature..."
                                        value={formData.interests}
                                        onChange={handleChange}
                                        className="bg-[#111] border-white/10 text-white focus:border-amber-500/50 focus:ring-amber-500/20 rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-slate-300 text-sm font-medium">Preferred Work Mode</Label>
                                    <Select
                                        required
                                        onValueChange={(value) => setFormData({ ...formData, preferredWorkEnvironment: value })}
                                    >
                                        <SelectTrigger className="bg-[#111] border-white/10 text-white focus:border-amber-500/50 rounded-lg">
                                            <SelectValue placeholder="Select..." />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#111] border-white/10 text-white">
                                            <SelectItem value="remote">🏠 Remote</SelectItem>
                                            <SelectItem value="in-office">🏢 In-Office</SelectItem>
                                            <SelectItem value="hybrid">🔄 Hybrid</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-6 mt-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-amber-900/20 cursor-pointer"
                                >
                                    {loading ? (
                                        <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Thinking...</>
                                    ) : (
                                        <>Reveal My Career Path <ArrowRight className="w-5 h-5 ml-2" /></>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Results Area */}
                    <div className="lg:col-span-2 space-y-6">

                        {error && (
                            <FetchErrorBanner
                                message={error}
                                onRetry={runRecommendation}
                                className="min-h-[200px] justify-center"
                            />
                        )}

                        {!aiRecommendation && !loading && !error && (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-[#0A0A0A] border-2 border-dashed border-white/10 rounded-3xl p-8 text-center">
                                <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                                    <Lightbulb className="w-10 h-10 text-amber-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Ready to Guide You</h3>
                                <p className="text-slate-400 max-w-sm">
                                    Fill in your details on the left. Our AI will analyze global market trends to find your best fit.
                                </p>
                            </div>
                        )}

                        {/* Loading State - Shown while streaming starts or if buffering */}
                        {loading && !aiRecommendation && (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center space-y-4">
                                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                <p className="text-amber-400/80 animate-pulse">Analyzing your profile against 10,000+ career paths...</p>
                            </div>
                        )}

                        {/* Streaming Results - Shows IMMEDIATELY when text arrives */}
                        {aiRecommendation && (
                            <div ref={resultsRef} className="bg-[#0A0A0A] border border-amber-500/20 rounded-3xl p-8 md:p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                                    <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 border border-amber-500/20">
                                        <Sparkles size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Recommended Strategy</h2>
                                        <p className="text-slate-400 text-sm">Tailored for {formData.userFullName}</p>
                                    </div>
                                </div>

                                {/* This div contains the EXACT styling you requested from your original upload 
                                    to ensure headings, lists, and spacing look "Ache se" (Properly).
                                */}
                                <div
                                    className="
                                        text-slate-300 leading-relaxed space-y-6
                                        [&>h1]:text-amber-400 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-6
                                        [&>h2]:text-amber-400 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-8 [&>h2]:mb-4
                                        [&>h3]:text-amber-400 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3
                                        [&>h4]:text-amber-300 [&>h4]:text-lg [&>h4]:font-medium [&>h4]:mt-5 [&>h4]:mb-3
                                        [&>p]:text-slate-300 [&>p]:leading-7 [&>p]:mb-5
                                        [&>ul]:text-slate-300 [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2 [&>ul]:list-disc
                                        [&>ol]:text-slate-300 [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2
                                        [&>li]:mb-2 [&>li]:leading-7
                                        [&>strong]:text-white [&>strong]:font-semibold
                                        [&>blockquote]:border-l-4 [&>blockquote]:border-amber-500 [&>blockquote]:pl-4 [&>blockquote]:bg-white/5 [&>blockquote]:p-4 [&>blockquote]:rounded [&>blockquote]:my-6
                                    "
                                    dangerouslySetInnerHTML={renderMarkdown(aiRecommendation)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}