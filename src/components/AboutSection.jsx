import React from 'react';

const AboutSection = React.forwardRef((props, ref) => {
    return (
        <section ref={ref} className="py-12 md:py-20 bg-gray-800/20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-slideInLeft">
                        ABOUT ME
                    </h2>

                    <div className="space-y-4 text-blue-300 text-base md:text-lg">
                        <p className="animate-slideInRight delay-200">
                            I'm <span className="text-cyan-300 font-bold">Antrow Jefin</span>, a Full-Stack Developer based in Chennai, India.
                            Currently pursuing my Master's in Computer Science at SRM Institute of Science and Technology
                            while working as a Project Lead at Infosys Springboard.
                        </p>

                        <p className="animate-slideInRight delay-400">
                            With experience at <span className="text-cyan-300">Deloitte</span> and hands-on expertise in
                            <span className="text-cyan-300"> Spring Boot</span>, <span className="text-cyan-300">React</span>,
                            and <span className="text-cyan-300">Angular</span>, I specialize in building scalable web applications
                            with clean architecture. I've led teams, designed efficient algorithms, and delivered systems
                            handling thousands of daily users.
                        </p>

                        <p className="animate-slideInRight delay-600">
                            Beyond enterprise development, I'm passionate about <span className="text-purple-300">game development</span>.
                            I've published multiple mobile games on the Play Store using Unity and Unreal Engine.
                            My journey began when I modded my first game at 14, and I've been hooked on creating
                            interactive experiences ever since.
                        </p>

                        <p className="animate-slideInRight delay-800">
                            I'm also an avid adopter of <span className="text-cyan-300">AI-assisted development tools</span> like
                            Claude, Cursor, and Antigravity, using them to boost productivity and explore cutting-edge solutions.
                            When I'm not coding, you can find me analyzing game mechanics, exploring new frameworks,
                            or contributing to open-source projects.
                        </p>
                    </div>

                    {/* Quick Facts */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {[
                            { label: 'Years of Experience', value: '2+' },
                            { label: 'Published Games', value: '3' },
                            { label: 'Projects Completed', value: '10+' },
                            { label: 'Current CGPA', value: '9.27' }
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
