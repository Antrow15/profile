import React from 'react';

const skillCategories = [
    {
        name: 'Languages',
        icon: '💻',
        skills: [
            { name: 'Java', level: 90 },
            { name: 'JavaScript', level: 85 },
            { name: 'C/C++', level: 80 },
            { name: 'Python', level: 75 },
            { name: 'PHP', level: 75 },
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
            { name: 'Bootstrap', level: 85 },
            { name: 'WordPress', level: 70 }
        ]
    },
    {
        name: 'Game & 3D',
        icon: '🎮',
        skills: [
            { name: 'Unity', level: 85 },
            { name: 'Unreal Engine', level: 75 },
            { name: 'Autodesk Maya', level: 80 },
            { name: '3ds Max', level: 70 },
            { name: 'C# (Unity)', level: 85 }
        ]
    },
    {
        name: 'AR/VR',
        icon: '🥽',
        skills: [
            { name: 'Vuforia', level: 80 },
            { name: 'AR Foundation', level: 75 },
            { name: 'AR Development', level: 80 }
        ]
    },
    {
        name: 'Tools & Design',
        icon: '🛠️',
        skills: [
            { name: 'Git/GitHub', level: 90 },
            { name: 'VS Code', level: 95 },
            { name: 'Postman', level: 85 },
            { name: 'Photoshop', level: 75 },
            { name: 'MS Office', level: 85 }
        ]
    },
    {
        name: 'Deployment',
        icon: '☁️',
        skills: [
            { name: 'Vercel', level: 85 },
            { name: 'Render', level: 80 },
            { name: 'Cloudflare', level: 75 },
            { name: 'Google Play', level: 80 }
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

                {/* Additional Skills & Interests */}
                <div className="mt-10 text-center">
                    <h3 className="text-lg font-bold text-cyan-300 mb-4">Areas of Interest</h3>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {['Web Development', 'Game Development', 'AR/VR', 'Software Engineering', 'AI Tools'].map((interest, index) => (
                            <span
                                key={interest}
                                className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 text-sm font-semibold animate-fadeInUp"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {interest}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-lg font-bold text-cyan-300 mb-4">Soft Skills</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {['Problem Solving', 'Self-Learning', 'Presentation', 'Adaptability', 'Team Collaboration'].map((skill, index) => (
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
