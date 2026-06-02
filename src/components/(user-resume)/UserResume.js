"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Copy, ClipboardCheck, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import ResumeCard from './ResumeCard'
import { motion, AnimatePresence } from 'framer-motion'

const UserResume = () => {
    const [resumes, setResumes] = useState([])
    const [selectedResume, setSelectedResume] = useState(null)
    const [copied, setCopied] = useState(false)
    const [isLoading, setIsLoading] = useState({
        resumes: true,
        deleting: false
    })
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "loading") return;
        if (!session || status === "unauthenticated") {
            router.push("/");
        }
    }, [router, session, status])

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                setIsLoading(prev => ({ ...prev, resumes: true }))
                const response = await axios.get('/api/analyze-resume/get-resumes');
                setResumes(response.data.userResumes);
            } catch (error) {
                console.error("Failed to fetch resumes:", error.message);
                toast.error("Failed to load resumes. Please try again.");
            } finally {
                setIsLoading(prev => ({ ...prev, resumes: false }))
            }
        }

        fetchResumes();
    }, [session])

    const handleResumeClick = async (resumeId) => {
        try {
            const res = await axios.get(`/api/analyze-resume/get-resume-content?id=${resumeId}`);
            setSelectedResume({ id: resumeId, value: res.data.resumeHtml });
        } catch (error) {
            console.error("Failed to load resume content:", error.message);
            toast.error("Could not load resume. Please try again.");
        }
    }

    const handleDeleteResume = async (resumeId) => {
        try {
            setIsLoading(prev => ({ ...prev, deleting: true }))

            await axios.delete(`/api/delete-resume?id=${resumeId}`);

            // Use functional update to ensure latest state
            setResumes(prevResumes =>
                prevResumes.filter(resume => resume.id !== resumeId)
            );

            toast.success("Resume deleted successfully");
        } catch (error) {
            console.error("Failed to delete resume:", error.message);
            toast.error("Could not delete resume. Please try again.");
        } finally {
            setIsLoading(prev => ({ ...prev, deleting: false }))
        }
    }

    const handleEditResume = (resumeId) => {
        router.push(`/resume-builder?id=${resumeId}`);
    }

    const handleCreateResume = async () => {
        try {
            const response = await axios.post('/api/create-resume', {
                userEmail: session.user.email
            });
            router.push(`/resume-builder?id=${response.data.resumeId}`);
        } catch (error) {
            console.error("Failed to create resume:", error.message);
            toast.error("Could not create resume. Please try again.");
        }
    }

    const handleCopy = () => {
        if (!selectedResume) return;
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = document.querySelector('.prose').textContent;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    // If resumes are loading, show a loading state
    if (isLoading.resumes) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="animate-spin w-16 h-16 mx-auto mb-4 border-4 border-t-indigo-500 border-gray-200 rounded-full"></div>
                    <p>Loading your resumes...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen  text-white py-16 px-4">
            <AnimatePresence mode="wait">
                {selectedResume ? (
                    <motion.div
                        key="resume-view"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="max-w-6xl mx-auto relative"
                    >
                        <div className="absolute inset-0 rounded-2xl"></div>
                        <div className="absolute inset-0 rounded-2xl blur-xl"></div>

                        <div className="relative border border-gray-700/50 rounded-2xl backdrop-blur-sm p-8 hover:border-gray-600/50 transition-all duration-300">

                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-800/50">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Resume Preview</h2>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setSelectedResume(null)}
                                        className="group flex items-center px-4 py-2 border border-gray-700/50 hover:border-gray-600/50 rounded-lg text-white text-sm font-medium transition-all duration-300 cursor-pointer"
                                    >
                                        <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                                        Back to Resumes
                                    </button>

                                    <button
                                        onClick={handleCopy}
                                        className="group flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25 cursor-pointer"
                                    >
                                        {copied ? (
                                            <>
                                                <ClipboardCheck className="mr-2 w-4 h-4" />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                                                Copy Resume
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Resume content with enhanced styling */}
                            <div className="relative">
                                {/* Subtle background pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute top-4 left-4 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
                                    <div className="absolute bottom-4 right-4 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
                                </div>

                                <div
                                    className="relative prose prose-invert max-w-none text-gray-300 leading-relaxed prose-headings:text-white prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-300 prose-strong:text-gray-200 prose-ul:text-gray-300 prose-li:text-gray-300"
                                    dangerouslySetInnerHTML={{ __html: selectedResume.value }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="resume-list"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                                Your Resume Portfolio
                            </h1>

                        </div>

                        {resumes.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                {resumes.map((resume, index) => (
                                    <ResumeCard
                                        key={resume.id}
                                        resume={resume}
                                        onClick={handleResumeClick}
                                        index={index}
                                    />


                                ))}
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default UserResume