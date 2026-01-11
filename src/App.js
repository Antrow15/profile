import React, { useState, useRef, useEffect } from 'react';
import { LucideArrowUp } from 'lucide-react';

// Import components
import {
  Navbar,
  HeroSection,
  ExperienceSection,
  EducationSection,
  ProjectsSection,
  SkillsSection,
  AchievementsSection,
  ShowreelSection,
  AboutSection,
  ContactSection,
  Footer
} from './components';

// Import styles
import './styles/animations.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const sectionsRef = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setShowScrollTop(scrolled);
      setShowNavbar(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    sectionsRef.current[sectionId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 text-cyan-400 min-h-screen font-mono relative">
      {/* Sticky Navigation */}
      <Navbar
        showNavbar={showNavbar}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <main>
        <HeroSection
          ref={(el) => sectionsRef.current.hero = el}
          onNavigate={scrollToSection}
        />
        <ExperienceSection ref={(el) => sectionsRef.current.experience = el} />
        <ProjectsSection ref={(el) => sectionsRef.current.projects = el} />
        <SkillsSection ref={(el) => sectionsRef.current.skills = el} />
        <EducationSection ref={(el) => sectionsRef.current.education = el} />
        <AchievementsSection ref={(el) => sectionsRef.current.achievements = el} />
        <ShowreelSection ref={(el) => sectionsRef.current.showreel = el} />
        <AboutSection ref={(el) => sectionsRef.current.about = el} />
        <ContactSection ref={(el) => sectionsRef.current.contact = el} />
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-cyan-600 text-gray-900 rounded-full hover:bg-cyan-500 transition-all z-40 hover:scale-110 shadow-lg shadow-cyan-400/30 animate-bounce"
          aria-label="Scroll to top"
        >
          <LucideArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default App;