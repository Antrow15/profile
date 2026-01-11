import React from 'react';
import { LucideBriefcase, LucideCalendar, LucideMapPin } from 'lucide-react';

const experiences = [
    {
        company: "Infosys Springboard",
        role: "Project Lead – Full Stack Development Intern",
        duration: "Dec 2025 – Present",
        location: "Remote",
        type: "Internship",
        highlights: [
            "Architected and deployed JURIFY, a full-stack legal aid platform supporting 3 user roles with 98% uptime, handling 25+ concurrent users during UAT",
            "Engineered a rule-based case-to-lawyer matching algorithm, reducing case routing time by 60% (15 → 6 minutes)",
            "Built 12+ responsive React.js components with Tailwind CSS, achieving 35% faster page load times through code splitting and lazy loading",
            "Implemented real-time communication with Google Calendar + Jitsi Meet integration, supporting 500+ daily messages",
            "Integrated OpenStreetMap-based location services for proximity-aware lawyer discovery",
            "Led sprint planning and 20+ peer code reviews for a 4-member team with 100% milestone completion"
        ],
        tech: ["React", "Spring Boot", "Tailwind CSS", "Jitsi Meet", "Google Calendar API", "OpenStreetMap"]
    },
    {
        company: "Deloitte USI",
        role: "Associate Analyst",
        duration: "Aug 2023 – Aug 2024",
        location: "Hyderabad, Telangana",
        type: "Full-time",
        highlights: [
            "Completed 200+ hours of enterprise training in Java, Spring Boot, and Angular, scoring 92% on technical assessments",
            "Resolved 200+ M365 post-migration support tickets within SLA, reducing repeat incidents by 30%",
            "Monitored Workday application performance 24/7, maintaining 97% SLA compliance",
            "Coordinated with 3 cross-functional teams, achieving 99% stakeholder satisfaction rating"
        ],
        tech: ["Java", "Spring Boot", "Angular", "ServiceNow", "M365", "Workday"]
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
                            key={exp.company}
                            className="bg-gray-800/50 rounded-xl p-6 md:p-8 border-2 border-cyan-500/20 hover:border-cyan-500/50 transition-all animate-slideInUp"
                            style={{ animationDelay: `${index * 200}ms` }}
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
                                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${exp.type === 'Internship'
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
