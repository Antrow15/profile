import React, { useState } from 'react';
import { LucideMenu, LucideX } from 'lucide-react';

const navItems = [
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
];

const Navbar = ({ showNavbar, activeSection, onNavigate }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavigate = (sectionId) => {
        setMobileMenuOpen(false);
        onNavigate(sectionId);
    };

    if (!showNavbar) return null;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-cyan-400/30 transform transition-transform duration-300">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="text-xl font-bold text-cyan-300">J N ANTROW JEFIN</div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-6">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavigate(item.id)}
                                className={`text-sm font-bold transition-colors hover:text-cyan-100 ${activeSection === item.id ? 'text-cyan-100' : 'text-cyan-300'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <LucideX size={24} /> : <LucideMenu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-gray-800/95 border-t border-cyan-400/30 absolute left-0 right-0 top-16">
                        <div className="flex flex-col space-y-2 p-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigate(item.id)}
                                    className="text-left py-2 px-3 text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/10 rounded transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
