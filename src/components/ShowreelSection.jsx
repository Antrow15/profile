import React, { useState } from 'react';
import { LucidePlay } from 'lucide-react';

const ShowreelSection = React.forwardRef((props, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section ref={ref} className="py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-slideInLeft">
                        GAME DEV SHOWREEL
                    </h2>

                    <div className="relative group animate-slideInRight">
                        <div className="absolute inset-0 rounded-xl bg-cyan-500 opacity-20 group-hover:opacity-30 blur-md transition-all duration-300"></div>
                        <div className="relative bg-gray-800 rounded-xl overflow-hidden border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all">
                            <div className="w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-700 relative overflow-hidden">
                                {!isPlaying ? (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center cursor-pointer transform group-hover:scale-105 transition-transform"
                                        onClick={() => setIsPlaying(true)}
                                    >
                                        <div className="text-center">
                                            <div className="mb-4 relative">
                                                <div className="w-16 h-16 md:w-24 md:h-24 bg-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-400/50 hover:bg-cyan-500/30 transition-all">
                                                    <LucidePlay size={32} className="text-cyan-300 ml-1" />
                                                </div>
                                            </div>
                                            <p className="text-cyan-300 text-lg md:text-xl font-bold">3D Runner Demo</p>
                                            <p className="text-blue-300 text-sm mt-2">Click to play demo</p>
                                        </div>
                                    </div>
                                ) : (
                                    <video
                                        className="w-full h-full object-cover"
                                        controls
                                        autoPlay
                                        onEnded={() => setIsPlaying(false)}
                                    >
                                        <source src="/videos/GamePlay.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {['Unreal Engine', 'C++', 'Photoshop', 'Autodesk Maya'].map((tech, index) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full border border-cyan-500/30 text-sm animate-fadeInUp"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p className="text-center text-blue-300 mt-6 text-sm md:text-base max-w-2xl mx-auto">
                        Beyond web development, I have a passion for game development. This demo showcases a 3D runner
                        built with Unreal Engine, featuring custom assets created in Maya and Photoshop.
                    </p>
                </div>
            </div>
        </section>
    );
});

export default ShowreelSection;
