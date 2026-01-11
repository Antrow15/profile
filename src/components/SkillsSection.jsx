import React from 'react';

const skillCategories = [
    {
        name: 'Languages',
        icon: '💻',
        skills: [
            { name: 'Java', level: 90 },
            { name: 'JavaScript', level: 85 },
            { name: 'Python', level: 80 },
            { name: 'C/C++', level: 75 },
            { name: 'SQL', level: 85 },
            { name: 'HTML/CSS', level: 90 }
        ]
    },
    {
        name: 'Frameworks',
        icon: '🚀',
        skills: [
            { name: 'Spring Boot', level: 90 },
            { name: 'Angular', level: 85 },
            { name: 'React', level: 85 },
            { name: 'Bootstrap', level: 80 }
        ]
    },
    {
        name: 'Game Engines',
        icon: '🎮',
        skills: [
            { name: 'Unity', level: 80 },
            { name: 'Unreal Engine', level: 75 },
            { name: 'C# (Unity)', level: 85 }
        ]
    },
    {
        name: 'Tools & DevOps',
        icon: '🛠️',
        skills: [
            { name: 'Git/GitHub', level: 90 },
            { name: 'VS Code', level: 95 },
            { name: 'Postman', level: 85 },
            { name: 'Maya', level: 70 },
            { name: 'Photoshop', level: 70 }
        ]
    },
    {
        name: 'Deployment & Cloud',
        icon: '☁️',
        skills: [
            { name: 'Vercel', level: 85 },
            { name: 'Render', level: 80 },
            { name: 'Cloudflare', level: 75 }
        ]
    },
    {
        name: 'AI Tools',
        icon: '🤖',
        skills: [
            { name: 'Cursor', level: 90 },
            { name: 'Claude', level: 90 },
            { name: 'ChatGPT', level: 85 },
            { name: 'Antigravity', level: 90 }
        ]
    }
];

const SkillsSection = React.forwardRef((props, ref) => {
    return (
        <section ref={ref} className="py-12 md:py-20 bg-gray-800/20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-slideInLeft">
                    SKILLS & TOOLS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, catIndex) => (
                        <div
                            key={category.name}
                            className="bg-gray-800/50 rounded-xl p-5 border-2 border-cyan-500/20 hover:border-cyan-500/50 transition-all animate-slideInUp"
                            style={{ animationDelay: `${catIndex * 100}ms` }}
                        >
                            <div className="flex items-center mb-4">
                                <span className="text-2xl mr-3">{category.icon}</span>
                                <h3 className="text-lg font-bold text-cyan-300">{category.name}</h3>
                            </div>

                            <div className="space-y-3">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-blue-300">{skill.name}</span>
                                            <span className="text-cyan-400">{skill.level}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out animate-expandWidth"
                                                style={{
                                                    width: `${skill.level}%`,
                                                    animationDelay: `${catIndex * 100 + skillIndex * 50 + 300}ms`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Skills Tags */}
                <div className="mt-10 text-center">
                    <h3 className="text-lg font-bold text-cyan-300 mb-4">Also familiar with:</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {['REST APIs', 'JWT', 'MySQL', 'ServiceNow', 'Jitsi Meet', 'Google Calendar API', 'OpenStreetMap', 'Tesseract OCR', 'NLP', 'Shader Programming', 'UI/UX Design'].map((skill, index) => (
                            <span
                                key={skill}
                                className="px-3 py-1 bg-gray-800/50 text-cyan-300 rounded-full border border-cyan-500/20 text-sm animate-fadeInUp"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default SkillsSection;
