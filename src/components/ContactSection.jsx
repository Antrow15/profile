import React from 'react';
import { LucideMail, LucideGithub, LucideLinkedin, LucidePhone, LucideGlobe } from 'lucide-react';

const contactLinks = [
    {
        icon: LucideMail,
        href: "mailto:antrowjefin15@gmail.com",
        label: "antrowjefin15@gmail.com",
        delay: "delay-500"
    },
    {
        icon: LucidePhone,
        href: "tel:+919150851137",
        label: "+91 9150851137",
        delay: "delay-600"
    },
    {
        icon: LucideGithub,
        href: "https://github.com/Antrow15",
        label: "github.com/Antrow15",
        delay: "delay-700"
    },
    {
        icon: LucideLinkedin,
        href: "https://linkedin.com/in/antrow-jefin",
        label: "linkedin.com/in/antrow-jefin",
        delay: "delay-800"
    },
    {
        icon: LucideGlobe,
        href: "https://antrow-jefin.vercel.app",
        label: "antrow-jefin.vercel.app",
        delay: "delay-1000"
    }
];

const ContactSection = React.forwardRef((props, ref) => {
    return (
        <section ref={ref} className="py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-slideInLeft">
                        GET IN TOUCH
                    </h2>

                    <p className="text-blue-300 mb-8 text-base md:text-lg animate-fadeInUp delay-300">
                        Interested in collaborating on a project, discussing full-stack development,
                        or just want to chat about tech and games? Reach out through any of these channels.
                    </p>

                    {/* Contact Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {contactLinks.slice(0, 2).map(({ icon: Icon, href, label, delay }) => (
                            <a
                                key={href}
                                href={href}
                                target={href.startsWith('tel:') || href.startsWith('mailto:') ? undefined : "_blank"}
                                rel={href.startsWith('tel:') || href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                                className={`flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all group animate-slideInUp ${delay}`}
                            >
                                <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                                    <Icon size={20} className="text-cyan-400" />
                                </div>
                                <span className="text-blue-300 group-hover:text-cyan-300 transition-colors text-sm md:text-base">
                                    {label}
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-4 md:gap-6">
                        {contactLinks.slice(2).map(({ icon: Icon, href, label, delay }, index) => (
                            <a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={label}
                                className={`p-3 md:p-4 bg-gray-800 rounded-full border-2 border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all hover:scale-110 animate-slideInUp ${delay}`}
                            >
                                <Icon size={20} className="md:w-6 md:h-6" />
                            </a>
                        ))}
                    </div>

                    {/* Location */}
                    <p className="mt-8 text-sm text-blue-400 animate-fadeInUp delay-1000">
                        📍 Chennai, TamilNadu, India
                    </p>
                </div>
            </div>
        </section>
    );
});

export default ContactSection;
