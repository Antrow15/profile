import React from 'react';
import { LucideBriefcase, LucideCalendar, LucideMapPin } from 'lucide-react';

const experiences = [
    {
        company: "Infosys Springboard",
        role: "Full Stack Development Intern (Project Lead)",
        duration: "Dec 2025 – Present",
        location: "Virtual",
        type: "Virtual Internship",
        highlights: [
            "Participating in Infosys Springboard's online internship program focused on full-stack development",
            "Leading a 4-member team as Project Lead for JURIFY, a legal aid platform project",
            "Architected full-stack application with React.js frontend and Spring Boot backend",
            "Implemented real-time communication with Google Calendar + Jitsi Meet integration",
            "Conducting sprint planning and 20+ peer code reviews with 100% milestone completion"
        ],
        tech: ["React", "Spring Boot", "Tailwind CSS", "Jitsi Meet", "Google Calendar API"]
    },
    {
        company: "AICTE – EduSkills",
        role: "Java Full Stack Developer Virtual Intern",
        duration: "Jun 2025",
        location: "Virtual",
        type: "Virtual Internship",
        highlights: [
            "Completed 10-week virtual internship focused on Java Full Stack Development",
            "Covered front-end, back-end, and deployment fundamentals",
            "Emphasized practical, project-based learning with real-world use cases",
            "Learned enterprise application development techniques"
        ],
        tech: ["Java", "Spring Boot", "HTML/CSS", "JavaScript", "MySQL"]
    },
    {
        company: "AICTE – EduSkills (Google for Developers)",
        role: "Android Developer Virtual Intern",
        duration: "2025",
        location: "Virtual",
        type: "Virtual Internship",
        highlights: [
            "Completed 10-week virtual internship on Android App Development",
            "Supported by the Google India Edu Program",
            "Focused on core Android fundamentals, UI/UX, and Kotlin development",
            "Built deployable mobile applications through project-based learning"
        ],
        tech: ["Android", "Kotlin", "Java", "XML", "Material Design"]
    },
    {
        company: "Deloitte USI",
        role: "Associate Analyst",
        duration: "Aug 2023 – Aug 2024",
        location: "Hyderabad, India",
        type: "Full-time",
        highlights: [
            "Trained in Java, Spring Boot, and Angular for full-stack development",
            "Cleared internal technical assessments",
            "Worked on M365 migration, resolving post-migration issues",
            "Managed Workday monitoring, analyzing errors, and creating tickets in ServiceNow"
        ],
        tech: ["Java", "Spring Boot", "Angular", "ServiceNow", "M365", "Workday"]
    },
    {
        company: "Hoopoe Infoedge",
        role: "Game Designer Intern",
        duration: "Jan 2023 – Aug 2023",
        location: "Chennai, India",
        type: "Internship",
        highlights: [
            "Designed game mechanics, levels, and UI/UX for three published mobile games using Unity (C#)",
            "Optimized game asset integration and performance",
            "Contributed to production and Google Play Store deployment"
        ],
        tech: ["Unity", "C#", "Autodesk Maya", "Photoshop", "Google Play Console"]
    },
    {
        company: "Ardens Business Solution Pvt. Ltd.",
        role: "Frontend Developer Intern",
        duration: "Dec 2022 – Jan 2023",
        location: "Chennai, India",
        type: "Internship",
        highlights: [
            "Assisted in testing and UI validation for the HRMS portal",
            "Worked on form validation and functional correctness",
            "Provided feedback for UI improvements"
        ],
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap"]
    }
];

const ExperienceSection = React.forwardRef((props, ref) => {
    return (
        <section ref={ref} className="py-12 md:py-20 bg-gray-800/20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-slideInLeft">
                    <LucideBriefcase className="inline mr-3 mb-1" size={36} />
                    PROFESSIONAL EXPERIENCE
                </h2>

                <div className="max-w-5xl mx-auto space-y-8">
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.company + exp.role}
                            className="bg-gray-800/50 rounded-xl p-6 md:p-8 border-2 border-cyan-500/20 hover:border-cyan-500/50 transition-all animate-slideInUp"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-cyan-300 mb-1">
                                        {exp.company}
                                    </h3>
                                    <p className="text-lg text-blue-300 font-semibold">{exp.role}</p>
                                </div>
                                <div className="mt-2 md:mt-0 md:text-right">
                                    <div className="flex items-center text-cyan-400 text-sm md:text-base">
                                        <LucideCalendar size={16} className="mr-2" />
                                        {exp.duration}
                                    </div>
                                    <div className="flex items-center text-blue-300 text-sm mt-1">
                                        <LucideMapPin size={14} className="mr-2" />
                                        {exp.location}
                                    </div>
                                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${exp.type === 'Virtual Internship'
                                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                            : exp.type === 'Internship'
                                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                        }`}>
                                        {exp.type}
                                    </span>
                                </div>
                            </div>

                            <ul className="space-y-2 mb-4">
                                {exp.highlights.map((highlight, i) => (
                                    <li key={i} className="text-blue-300 text-sm md:text-base flex items-start">
                                        <span className="text-cyan-400 mr-2 mt-1">▹</span>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                {exp.tech.map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-cyan-300 border border-cyan-500/20">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default ExperienceSection;
