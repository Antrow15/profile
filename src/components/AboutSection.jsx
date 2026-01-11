import React from 'react';

const AboutSection = React.forwardRef((props, ref) => {
    return (
        <section ref={ref} className="py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-slideInLeft">
                        ABOUT ME
                    </h2>

                    <div className="space-y-4 text-blue-300 text-base md:text-lg">
                        <p className="animate-slideInRight delay-200">
                            I'm <span className="text-cyan-300 font-bold">J N Antrow Jefin</span>, a Full-Stack Developer and Game Developer based in Chennai, India.
                            Currently pursuing my Master's in Computer Science at SRM Institute of Science and Technology (CGPA: 9.14)
                            while participating in the Infosys Springboard virtual internship as a Project Lead.
                        </p>

                        <p className="animate-slideInRight delay-400">
                            With professional experience at <span className="text-cyan-300">Deloitte</span>, <span className="text-cyan-300">Hoopoe Infoedge</span>,
                            and <span className="text-cyan-300">Ardens Business Solution</span>, I've worked across the full spectrum of software development —
                            from enterprise applications with <span className="text-cyan-300">Spring Boot</span> and <span className="text-cyan-300">Angular</span>
                            to mobile games with <span className="text-cyan-300">Unity</span> and <span className="text-cyan-300">Unreal Engine</span>.
                        </p>

                        <p className="animate-slideInRight delay-600">
                            I hold an <span className="text-purple-300">Advanced Diploma in Interactive Design and Games (ADIDG)</span> from MAAC,
                            which fuels my passion for creating immersive experiences. I've published 3 games on the Google Play Store and
                            developed multiple AR/VR applications for architectural and industrial visualization.
                        </p>

                        <p className="animate-slideInRight delay-800">
                            Beyond tech, I'm an <span className="text-yellow-300">International Taekwondo Medalist</span> and have represented my college
                            as the <span className="text-cyan-300">Gaming eSports Ambassador</span>. I also manage freelance web projects like
                            <span className="text-cyan-300"> KR Scrap Exports</span> and contribute to college websites. When I'm not coding,
                            you can find me analyzing game mechanics, competing in eSports, or exploring new frameworks.
                        </p>
                    </div>

                    {/* Quick Facts */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {[
                            { label: 'Years of Experience', value: '2+' },
                            { label: 'Published Games', value: '3' },
                            { label: 'Projects Completed', value: '12+' },
                            { label: 'Current CGPA', value: '9.14' }
                        ].map((fact, index) => (
                            <div
                                key={fact.label}
                                className="bg-gray-800/50 rounded-lg p-4 text-center border border-cyan-500/20 animate-slideInUp"
                                style={{ animationDelay: `${index * 100 + 500}ms` }}
                            >
                                <div className="text-2xl md:text-3xl font-bold text-cyan-300">{fact.value}</div>
                                <div className="text-xs md:text-sm text-blue-300 mt-1">{fact.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default AboutSection;
