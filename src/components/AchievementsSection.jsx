import React from 'react';
import { LucideTrophy, LucideMedal, LucideAward, LucideExternalLink } from 'lucide-react';

const achievements = [
    {
        title: "Bug War - First Place",
        event: "ANALYTIKHA 2021",
        institution: "St. Joseph's College",
        icon: "🥇",
        type: "gold"
    },
    {
        title: "IT Quiz - Second Place",
        event: "XACTITUDE 2021",
        institution: "Kristu Jayanti College",
        icon: "🥈",
        type: "silver"
    },
    {
        title: "Code Debugging - Second Place",
        event: "INFINIX 2022",
        institution: "St. Peter's College",
        icon: "🥈",
        type: "silver"
    },
    {
        title: "International Taekwondo Medalist",
        event: "International Championship",
        institution: "",
        icon: "🥋",
        type: "special"
    }
];

const certifications = [
    {
        title: "Java Foundation Certification",
        issuer: "Infosys Springboard",
        date: "June 24, 2025",
        credentialId: null,
        link: "https://verify.onwingspan.com",
        icon: "☕"
    },
    {
        title: "Java Full Stack Developer",
        issuer: "AICTE – EduSkills",
        date: "June 2025",
        credentialId: "fdf2e5ea66a8cbf8836e6446eb2cb7ee",
        link: null,
        icon: "💻"
    },
    {
        title: "Android Developer",
        issuer: "AICTE – EduSkills (Google for Developers)",
        date: "2025",
        credentialId: "e23566572ea69e24a9a9248398257468",
        link: null,
        icon: "📱"
    }
];

const responsibilities = [
    {
        title: "Gaming Event Host",
        organization: "SRM Vadapalani Campus",
        duration: "2023",
        description: "Organized and managed a gaming event as part of a technical symposium, ensuring smooth execution and participation."
    },
    {
        title: "College Ambassador for Gaming eSports",
        organization: "GGN (Good Game Nation) - Loyola College",
        duration: "2021 - 2023",
        description: "Acted as the representative for gaming eSports events, promoting participation and coordinating with event organizers."
    }
];

const AchievementsSection = React.forwardRef((props, ref) => {
    return (
        <section ref={ref} className="py-12 md:py-20 bg-gray-800/20">
            <div className="container mx-auto px-4">
                {/* Certifications */}
                <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-slideInLeft">
                    <LucideAward className="inline mr-3 mb-1" size={36} />
                    CERTIFICATIONS
                </h2>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {certifications.map((cert, index) => (
                        <div
                            key={cert.title}
                            className="bg-gray-800/50 rounded-xl p-5 border-2 border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:-translate-y-2 animate-slideInUp"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="text-4xl mb-3">{cert.icon}</div>
                            <h3 className="text-lg font-bold text-cyan-300 mb-1">{cert.title}</h3>
                            <p className="text-blue-300 text-sm mb-2">{cert.issuer}</p>
                            <p className="text-cyan-400 text-xs mb-2">{cert.date}</p>
                            {cert.credentialId && (
                                <p className="text-gray-500 text-xs font-mono truncate" title={cert.credentialId}>
                                    ID: {cert.credentialId.substring(0, 12)}...
                                </p>
                            )}
                            {cert.link && (
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-cyan-400 text-xs mt-2 hover:text-cyan-300"
                                >
                                    <LucideExternalLink size={12} />
                                    Verify
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* Achievements */}
                <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 animate-slideInLeft">
                    <LucideTrophy className="inline mr-3 mb-1" size={36} />
                    ACHIEVEMENTS
                </h2>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {achievements.map((achievement, index) => (
                        <div
                            key={achievement.title}
                            className={`bg-gray-800/50 rounded-xl p-5 border-2 transition-all hover:-translate-y-2 animate-slideInUp ${achievement.type === 'gold'
                                    ? 'border-yellow-500/30 hover:border-yellow-500/60 hover:shadow-lg hover:shadow-yellow-400/20'
                                    : achievement.type === 'silver'
                                        ? 'border-gray-400/30 hover:border-gray-400/60 hover:shadow-lg hover:shadow-gray-400/20'
                                        : 'border-purple-500/30 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-400/20'
                                }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="text-4xl">{achievement.icon}</div>
                                <div>
                                    <h3 className={`text-lg font-bold mb-1 ${achievement.type === 'gold' ? 'text-yellow-400' :
                                            achievement.type === 'silver' ? 'text-gray-300' : 'text-purple-300'
                                        }`}>
                                        {achievement.title}
                                    </h3>
                                    <p className="text-cyan-400 text-sm">{achievement.event}</p>
                                    {achievement.institution && (
                                        <p className="text-blue-300 text-xs mt-1">{achievement.institution}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Positions of Responsibility */}
                <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-slideInLeft">
                    <LucideMedal className="inline mr-3 mb-1" size={36} />
                    POSITIONS OF RESPONSIBILITY
                </h2>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {responsibilities.map((role, index) => (
                        <div
                            key={role.title}
                            className="bg-gray-800/50 rounded-xl p-6 border-2 border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:-translate-y-2 animate-slideInUp"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-bold text-cyan-300">{role.title}</h3>
                                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs border border-cyan-500/30">
                                    {role.duration}
                                </span>
                            </div>
                            <p className="text-purple-300 text-sm font-semibold mb-2">{role.organization}</p>
                            <p className="text-blue-300 text-sm">{role.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default AchievementsSection;
