import React, { useState } from 'react';
import { LucideExternalLink, LucideGithub, LucideGamepad2, LucideCode, LucideBrain } from 'lucide-react';

const projects = [
    // Full-Stack Projects
    {
        title: "JURIFY - Legal Aid Platform",
        description: "A full-stack legal aid platform supporting 3 user roles with real-time communication, automated consultation booking via Google Calendar + Jitsi Meet, and proximity-aware lawyer discovery using OpenStreetMap.",
        tech: ['React', 'Spring Boot', 'Tailwind CSS', 'Jitsi Meet', 'Google Calendar API'],
        category: 'fullstack',
        link: null,
        github: null,
        image: null,
        highlights: [
            "98% uptime handling 25+ concurrent users",
            "60% reduction in case routing time",
            "500+ daily messages supported"
        ]
    },
    {
        title: "User Learning Portal",
        description: "A full-stack learning management system enabling 500+ users to create courses, track progress, and manage enrollments with JWT-based role-based access control.",
        tech: ['Spring Boot', 'Angular', 'MySQL', 'REST APIs', 'JWT'],
        category: 'fullstack',
        link: null,
        github: null,
        image: null,
        highlights: [
            "99% system availability",
            "2,000+ daily active sessions",
            "15+ secured API endpoints"
        ]
    },
    {
        title: "Fake News Detector",
        description: "A multilingual web application to verify text and image authenticity using NLP, Tesseract OCR, Whisper transcription, and Gemini 2.5 Flash for real-time verification.",
        tech: ['React', 'Python', 'NLP', 'Tesseract OCR', 'Gemini API', 'LibreTranslate'],
        category: 'aiml',
        link: null,
        github: null,
        image: null,
        highlights: [
            "Cross-media misinformation detection",
            "Multilingual support",
            "Real-time verification pipeline"
        ]
    },
    // Game Projects
    {
        title: "Space Twister",
        description: "Jump across floating space platforms, collect crystals, and unlock epic skins in this fast-paced cosmic runner.",
        tech: ['Unity', 'C#', 'Autodesk Maya'],
        category: 'game',
        link: "https://play.google.com/store/apps/details?id=com.HoopoeInfoedge.SpaceTwister",
        github: null,
        image: "/images/SpaceTwister.jpg"
    },
    {
        title: "Galactic Gobbler",
        description: "Guide planets into a black hole with precision lines while dodging dangerous Metroids in this cosmic puzzle challenge.",
        tech: ['Unity', 'C#', 'Photoshop'],
        category: 'game',
        link: "https://play.google.com/store/apps/details?id=com.HoopoeInfoedge.GalacticGobbler",
        github: null,
        image: "/images/GalacticGobbler.jpg"
    },
    {
        title: "Mars Runner",
        description: "An exciting endless running game set on the red planet. Dodge obstacles and see how far you can run on the challenging terrain of Mars.",
        tech: ['Unity', 'C#', 'Photoshop'],
        category: 'game',
        link: "https://play.google.com/store/apps/details?id=com.HoopoeInfoedge.MarsRunner",
        github: null,
        image: "/images/MarsRunner.jpg"
    }
];

const categories = [
    { id: 'all', label: 'All Projects', icon: LucideCode },
    { id: 'fullstack', label: 'Full-Stack', icon: LucideCode },
    { id: 'aiml', label: 'AI/ML', icon: LucideBrain },
    { id: 'game', label: 'Games', icon: LucideGamepad2 }
];

const ProjectsSection = React.forwardRef((props, ref) => {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const getCategoryColor = (category) => {
        switch (category) {
            case 'fullstack': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
            case 'aiml': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
            case 'game': return 'bg-green-500/20 text-green-300 border-green-500/30';
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    const getCategoryLabel = (category) => {
        switch (category) {
            case 'fullstack': return 'Full-Stack';
            case 'aiml': return 'AI/ML';
            case 'game': return 'Game';
            default: return category;
        }
    };

    return (
        <section ref={ref} className="py-12 md:py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-slideInLeft">
                    PROJECTS
                </h2>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${activeCategory === cat.id
                                        ? 'bg-cyan-500 text-gray-900'
                                        : 'bg-gray-800/50 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20'
                                    }`}
                            >
                                <Icon size={16} />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.title}
                            className="bg-gray-800/50 rounded-xl overflow-hidden border-2 border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-400/20 animate-slideInUp"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {project.image ? (
                                <div className="aspect-video bg-gradient-to-br from-cyan-900/30 to-purple-900/30 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="hidden w-full h-full items-center justify-center">
                                        <div className="text-3xl md:text-5xl animate-pulse">🎮</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                    <div className="text-center">
                                        {project.category === 'aiml' ? (
                                            <LucideBrain size={48} className="mx-auto text-purple-400 mb-2" />
                                        ) : (
                                            <LucideCode size={48} className="mx-auto text-cyan-400 mb-2" />
                                        )}
                                        <span className="text-xs text-gray-500">Project</span>
                                    </div>
                                </div>
                            )}

                            <div className="p-4 md:p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl md:text-2xl font-bold text-cyan-300">{project.title}</h3>
                                    <span className={`px-2 py-1 rounded text-xs font-bold border ${getCategoryColor(project.category)}`}>
                                        {getCategoryLabel(project.category)}
                                    </span>
                                </div>

                                <p className="text-blue-300 mb-4 text-sm md:text-base">{project.description}</p>

                                {project.highlights && (
                                    <ul className="mb-4 space-y-1">
                                        {project.highlights.map((h, i) => (
                                            <li key={i} className="text-xs text-cyan-400 flex items-center">
                                                <span className="mr-2">✓</span>{h}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="px-2 py-1 bg-gray-700 rounded text-xs text-cyan-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-gray-900 font-bold rounded hover:bg-cyan-500 transition-colors transform hover:scale-105 text-sm"
                                        >
                                            <LucideExternalLink size={14} />
                                            {project.category === 'game' ? 'Play Store' : 'View'}
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-cyan-300 font-bold rounded hover:bg-gray-600 transition-colors text-sm"
                                        >
                                            <LucideGithub size={14} />
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default ProjectsSection;
