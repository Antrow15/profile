import React from 'react';
import { LucideGraduationCap, LucideCalendar, LucideMapPin, LucideAward } from 'lucide-react';

const education = [
    {
        institution: "SRM Institute of Science and Technology",
        campus: "KTR Campus",
        degree: "Master of Science in Computer Science",
        duration: "June 2024 – Present",
        location: "Chennai, TamilNadu",
        cgpa: "9.27",
        status: "Pursuing"
    },
    {
        institution: "Loyola College",
        campus: "",
        degree: "Bachelor of Science in Computer Science",
        duration: "June 2020 – May 2023",
        location: "Chennai, TamilNadu",
        cgpa: "8.11",
        status: "Completed"
    }
];

const EducationSection = React.forwardRef((props, ref) => {
    return (
        <section ref={ref} className="py-12 md:py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-slideInLeft">
                    <LucideGraduationCap className="inline mr-3 mb-1" size={36} />
                    EDUCATION
                </h2>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {education.map((edu, index) => (
                        <div
                            key={edu.institution}
                            className="bg-gray-800/50 rounded-xl p-6 border-2 border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:-translate-y-2 animate-slideInUp"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                                    <LucideGraduationCap size={24} className="text-cyan-400" />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${edu.status === 'Pursuing'
                                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                    }`}>
                                    {edu.status}
                                </span>
                            </div>

                            <h3 className="text-lg md:text-xl font-bold text-cyan-300 mb-1">
                                {edu.institution}
                            </h3>
                            {edu.campus && (
                                <p className="text-sm text-blue-400 mb-2">{edu.campus}</p>
                            )}
                            <p className="text-blue-300 font-semibold mb-3">{edu.degree}</p>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center text-cyan-400">
                                    <LucideCalendar size={14} className="mr-2" />
                                    {edu.duration}
                                </div>
                                <div className="flex items-center text-blue-300">
                                    <LucideMapPin size={14} className="mr-2" />
                                    {edu.location}
                                </div>
                                <div className="flex items-center text-yellow-400">
                                    <LucideAward size={14} className="mr-2" />
                                    CGPA: <span className="font-bold ml-1">{edu.cgpa}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default EducationSection;
