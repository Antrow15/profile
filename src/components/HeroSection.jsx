import React from 'react';
import { LucideCode, LucideBriefcase } from 'lucide-react';
import PixelRocketBackground from './PixelRocketBackground';

const navItems = [
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
];

const HeroSection = React.forwardRef(({ onNavigate }, ref) => {
    return (
        <section ref={ref} className="min-h-screen flex flex-col justify-center relative overflow-hidden">
            {/* Pixel Art Background */}
            <PixelRocketBackground />

            {/* L-Corner Design Elements - Responsive */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 w-8 h-8 md:w-16 md:h-16 border-l-2 md:border-l-4 border-t-2 md:border-t-4 border-cyan-400 animate-pulse"></div>
            <div className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-16 md:h-16 border-r-2 md:border-r-4 border-t-2 md:border-t-4 border-cyan-400 animate-pulse"></div>
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-8 h-8 md:w-16 md:h-16 border-l-2 md:border-l-4 border-b-2 md:border-b-4 border-cyan-400 animate-pulse"></div>
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-8 h-8 md:w-16 md:h-16 border-r-2 md:border-r-4 border-b-2 md:border-b-4 border-cyan-400 animate-pulse"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-8 md:mb-12">
                    <div className="inline-block p-1 border-2 border-cyan-400 mb-6 md:mb-8 animate-fadeInUp">
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 px-2 md:px-4 py-1 md:py-2">
                            J N ANTROW JEFIN
                        </h1>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-fadeInUp delay-300">
                        FULL-STACK DEVELOPER
                    </h2>

                    <p className="text-lg md:text-xl lg:text-2xl text-blue-300 mb-8 md:mb-12 max-w-3xl mx-auto animate-fadeInUp delay-500">
                        Building scalable web applications with Spring Boot, React & Angular.
                        Creating immersive games with Unity & Unreal Engine.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-8 md:mb-12 animate-fadeInUp delay-700">
                    <button
                        onClick={() => onNavigate('projects')}
                        className="px-6 md:px-8 py-3 bg-cyan-600 text-gray-900 font-bold rounded-md border-2 border-cyan-300 flex items-center justify-center gap-2 hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-400/30 transition-all transform hover:scale-105"
                    >
                        <LucideCode size={20} />
                        VIEW MY PROJECTS
                    </button>

                    <button
                        onClick={() => onNavigate('experience')}
                        className="px-6 md:px-8 py-3 bg-transparent text-cyan-300 font-bold rounded-md border-2 border-purple-500 hover:bg-purple-500/20 hover:shadow-lg hover:shadow-purple-400/30 transition-all transform hover:scale-105"
                    >
                        <LucideBriefcase size={20} className="inline mr-2" />
                        EXPERIENCE
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="text-center animate-fadeInUp delay-1000">
                    <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 bg-gray-800/50 px-3 md:px-6 py-2 md:py-3 rounded-full border border-cyan-400/30">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className="text-sm md:text-base text-cyan-300 hover:text-cyan-100 transition-colors font-bold hover:scale-110 transform transition-transform px-2"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </nav>
            </div>
        </section>
    );
});

export default HeroSection;
