const sampleResumeData = {
  personalInfo: {
    fullName: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    portfolio: "github.com/alexjohnson",
    summary: "Full-stack developer with 3+ years of experience building scalable web applications. Passionate about clean code, user experience, and solving real-world problems through technology.",
  },
  experience: [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer",
      startDate: "2022-06",
      endDate: "",
      current: true,
      description: "• Built and maintained microservices handling 1M+ daily requests\n• Improved API response time by 40% through caching strategies\n• Collaborated with cross-functional teams to ship 3 major features",
    },
    {
      id: 2,
      company: "Startup Inc.",
      role: "Frontend Developer",
      startDate: "2021-01",
      endDate: "2022-05",
      current: false,
      description: "• Developed responsive React applications used by 50k+ users\n• Reduced page load time by 60% through code splitting and lazy loading",
    },
  ],
  education: [
    {
      id: 1,
      institution: "MIT",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2017-08",
      endDate: "2021-05",
      gpa: "3.9",
    },
  ],
  skills: {
    technical: ["React", "Node.js", "Python", "TypeScript", "MongoDB", "AWS"],
    soft: ["Leadership", "Communication", "Problem Solving"],
  },
  projects: [
    {
      id: 1,
      title: "Rezumix",
      description: "AI-powered resume analyzer and builder with personality prediction",
      techStack: "Next.js, MongoDB, Gemini API",
      link: "https://github.com/alexjohnson/rezumix",
    },
  ],
  certifications: [
    {
      id: 1,
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2023-03",
      url: "https://aws.amazon.com/certification",
    },
  ],
};

export default sampleResumeData;