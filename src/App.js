import React, { useState, useRef, useEffect } from 'react';
import { LucideGithub, LucideLinkedin, LucideMail, LucidePlay, LucideArrowUp, LucideMenu, LucideX } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
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
      {showNavbar && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-cyan-400/30 transform transition-transform duration-300">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="text-xl font-bold text-cyan-300">J N ANTROW JEFIN</div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-6">
                {[
                  { id: 'games', label: 'Games' },
                  { id: 'showreel', label: 'Showreel' },
                  { id: 'skills', label: 'Skills' },
                  { id: 'about', label: 'About' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
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
                  {[
                    { id: 'games', label: 'Games' },
                    { id: 'showreel', label: 'Showreel' },
                    { id: 'skills', label: 'Skills' },
                    { id: 'about', label: 'About' },
                    { id: 'contact', label: 'Contact' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
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
      )}

      <main>
        <HeroSection
          ref={(el) => sectionsRef.current.hero = el}
          onNavigate={scrollToSection}
        />
        <GamesSection ref={(el) => sectionsRef.current.games = el} />
        <ShowreelSection ref={(el) => sectionsRef.current.showreel = el} />
        <SkillsSection ref={(el) => sectionsRef.current.skills = el} />
        <AboutSection ref={(el) => sectionsRef.current.about = el} />
        <ContactSection ref={(el) => sectionsRef.current.contact = el} />
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-cyan-600 text-gray-900 rounded-full hover:bg-cyan-500 transition-all z-40 hover:scale-110 shadow-lg shadow-cyan-400/30 animate-bounce"
        >
          <LucideArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

// Pixel Art Background Game Component with Larger Elements
const PixelRocketBackground = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef({
    rocket: { x: 80, y: 250, width: 48, height: 24 },
    asteroids: [],
    bullets: [],
    stars: [],
    lastBulletSpawn: 0,
    animationId: null
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const game = gameRef.current;

    // Disable anti-aliasing for pixel art
    ctx.imageSmoothingEnabled = false;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      game.rocket.y = canvas.height / 2;

      // Initialize stars
      game.stars = [];
      for (let i = 0; i < 80; i++) {
        game.stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 0.3 + Math.random() * 0.8,
          size: Math.random() < 0.6 ? 2 : 4
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize asteroids
    for (let i = 0; i < 4; i++) {
      game.asteroids.push({
        x: canvas.width + Math.random() * 600,
        y: Math.random() * (canvas.height - 80),
        size: 16 + Math.random() * 16,
        speed: 0.8 + Math.random() * 1.5,
        rotation: 0
      });
    }

    const drawPixelRect = (x, y, w, h, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(Math.floor(x), Math.floor(y), w, h);
    };

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      game.stars.forEach(star => {
        star.x -= star.speed;
        if (star.x < 0) star.x = canvas.width;

        drawPixelRect(star.x, star.y, star.size, star.size, star.size === 2 ? '#4a5568' : '#718096');
      });

      // Move rocket up and down slowly
      game.rocket.y = canvas.height / 2 + Math.sin(timestamp * 0.002) * 50;

      // Draw larger pixel rocket
      const rx = Math.floor(game.rocket.x);
      const ry = Math.floor(game.rocket.y);

      // Rocket body (cyan) - doubled size
      drawPixelRect(rx, ry + 8, 32, 8, '#00f0ff');
      drawPixelRect(rx + 32, ry + 4, 8, 16, '#00f0ff');
      drawPixelRect(rx + 40, ry + 8, 8, 8, '#00f0ff');

      // Rocket nose (white)
      drawPixelRect(rx + 40, ry + 10, 4, 4, '#ffffff');

      // Exhaust animation - larger
      const exhaustFrame = Math.floor(timestamp / 200) % 3;
      if (exhaustFrame === 0) {
        drawPixelRect(rx - 12, ry + 10, 8, 4, '#ff6b35');
        drawPixelRect(rx - 4, ry + 12, 4, 2, '#ffff00');
      } else if (exhaustFrame === 1) {
        drawPixelRect(rx - 16, ry + 8, 12, 8, '#ff6b35');
        drawPixelRect(rx - 4, ry + 10, 4, 4, '#ffff00');
      } else {
        drawPixelRect(rx - 8, ry + 12, 4, 2, '#ff6b35');
      }

      // Spawn bullets
      if (timestamp - game.lastBulletSpawn > 1000) {
        game.bullets.push({
          x: game.rocket.x + game.rocket.width,
          y: game.rocket.y + game.rocket.height / 2,
          speed: 3
        });
        game.lastBulletSpawn = timestamp;
      }

      // Update and draw bullets - larger
      game.bullets = game.bullets.filter(bullet => {
        bullet.x += bullet.speed;

        // Draw larger pixel bullet
        drawPixelRect(Math.floor(bullet.x), Math.floor(bullet.y), 8, 4, '#ffff00');

        return bullet.x < canvas.width + 20;
      });

      // Update and draw asteroids
      game.asteroids = game.asteroids.filter(asteroid => {
        asteroid.x -= asteroid.speed;
        asteroid.rotation += 0.02;

        // Check collision with bullets
        let hit = false;
        game.bullets = game.bullets.filter(bullet => {
          const dx = bullet.x - asteroid.x;
          const dy = bullet.y - asteroid.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < asteroid.size + 4) {
            hit = true;
            // Explosion effect - larger
            for (let i = 0; i < 8; i++) {
              const angle = (Math.PI * 2 / 8) * i;
              const particleX = asteroid.x + Math.cos(angle) * 12;
              const particleY = asteroid.y + Math.sin(angle) * 12;
              drawPixelRect(Math.floor(particleX), Math.floor(particleY), 4, 4, '#ff6b35');
            }
            return false;
          }
          return true;
        });

        if (hit) {
          return false;
        }

        // Draw larger pixel asteroid
        const ax = Math.floor(asteroid.x);
        const ay = Math.floor(asteroid.y);
        const size = Math.floor(asteroid.size);

        // Simple pixelated asteroid pattern - larger
        drawPixelRect(ax, ay + size / 3, size, size / 3, '#9d4edd');
        drawPixelRect(ax + size / 4, ay, size / 2, size, '#9d4edd');
        drawPixelRect(ax + size / 3, ay + size / 4, size / 3, size / 2, '#c77dff');

        // Respawn if off screen
        if (asteroid.x < -asteroid.size) {
          asteroid.x = canvas.width + Math.random() * 400;
          asteroid.y = Math.random() * (canvas.height - 80);
        }

        return true;
      });

      // Ensure minimum asteroids
      while (game.asteroids.length < 4) {
        game.asteroids.push({
          x: canvas.width + Math.random() * 600,
          y: Math.random() * (canvas.height - 80),
          size: 16 + Math.random() * 16,
          speed: 0.8 + Math.random() * 1.5,
          rotation: 0
        });
      }

      game.animationId = requestAnimationFrame(animate);
    };

    game.animationId = requestAnimationFrame(animate);

    return () => {
      if (game.animationId) {
        cancelAnimationFrame(game.animationId);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

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
            GAME DESIGNER & DEVELOPER
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl text-blue-300 mb-8 md:mb-12 max-w-3xl mx-auto animate-fadeInUp delay-500">
            Crafting immersive worlds and engaging gameplay experiences across mobile and desktop platforms.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-8 md:mb-12 animate-fadeInUp delay-700">
          <button
            onClick={() => onNavigate('games')}
            className="px-6 md:px-8 py-3 bg-cyan-600 text-gray-900 font-bold rounded-md border-2 border-cyan-300 flex items-center justify-center gap-2 hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-400/30 transition-all transform hover:scale-105"
          >
            <LucidePlay size={20} />
            VIEW MY GAMES
          </button>

          <button
            onClick={() => onNavigate('skills')}
            className="px-6 md:px-8 py-3 bg-transparent text-cyan-300 font-bold rounded-md border-2 border-purple-500 hover:bg-purple-500/20 hover:shadow-lg hover:shadow-purple-400/30 transition-all transform hover:scale-105"
          >
            SKILLS & TOOLS
          </button>
        </div>

        {/* Navigation Menu - Hidden on mobile when sticky nav appears */}
        <nav className="text-center animate-fadeInUp delay-1000">
          <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 bg-gray-800/50 px-3 md:px-6 py-2 md:py-3 rounded-full border border-cyan-400/30">
            {[
              { id: 'games', label: 'Games' },
              { id: 'showreel', label: 'Showreel' },
              { id: 'skills', label: 'Skills' },
              { id: 'about', label: 'About' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
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

const GamesSection = React.forwardRef((props, ref) => {
  const games = [
    {
      title: "Space Twister",
      description: "Jump across floating space platforms, collect crystals, and unlock epic skins in this fast-paced cosmic runner.",
      tech: ['Unity', 'C#', 'Autodesk Maya'],
      link: "https://play.google.com/store/apps/details?id=com.HoopoeInfoedge.SpaceTwister",
      image: "/images/SpaceTwister.jpg"
    },
    {
      title: "Galactic Gobbler",
      description: "Guide planets into a black hole with precision lines while dodging dangerous Metroids in this cosmic puzzle challenge.",
      tech: ['Unity', 'C#', 'Photoshop'],
      link: "https://play.google.com/store/apps/details?id=com.HoopoeInfoedge.GalacticGobbler",
      image: "/images/GalacticGobbler.jpg"
    },

    {
      title: "Mars Runner",
      description: "Mars Runner is an exciting endless running game set on the red planet. Dodge obstacles and see how far you can run on the challenging terrain of Mars.",
      tech: ['Unity', 'C#', 'Photoshop'],
      link: "https://play.google.com/store/apps/details?id=com.HoopoeInfoedge.MarsRunner",
      image: "/images/MarsRunner.jpg"
    },
  ];

  return (
    <section ref={ref} className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-slideInLeft">
          PUBLISHED GAMES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {games.map((game, index) => (
            <div
              key={game.title}
              className="bg-gray-800/50 rounded-xl overflow-hidden border-2 border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-400/20 animate-slideInUp"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="aspect-video bg-gradient-to-br from-cyan-900/30 to-purple-900/30 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center">
                  <div className="text-3xl md:text-5xl animate-pulse">👾</div>
                </div>
              </div>


              <div className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-cyan-300">{game.title}</h3>
                <p className="text-blue-300 mb-4 text-sm md:text-base">{game.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {game.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-700 rounded text-xs text-cyan-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={game.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-cyan-600 text-gray-900 font-bold rounded hover:bg-cyan-500 transition-colors transform hover:scale-105 text-sm md:text-base"
                >
                  View on Play Store
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const ShowreelSection = React.forwardRef((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section ref={ref} className="py-12 md:py-20 bg-gray-800/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-slideInLeft">
            3D RUNNER DEMO
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
              {['Unreal Enginer', 'C++', 'Photoshop', 'Autodesk Maya'].map((tech, index) => (
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
        </div>
      </div>
    </section>
  );
});

const SkillsSection = React.forwardRef((props, ref) => {
  const skills = [
    { name: 'Unity', icon: '🎮', level: 80 },
    { name: 'Unreal Engine', icon: '🖥️', level: 80 },
    { name: 'C#', icon: '#️⃣', level: 90 },
    { name: 'Maya', icon: '🧊', level: 70 },
    { name: 'Photoshop', icon: '🖌️', level: 70 },
    { name: 'Git', icon: '📦', level: 80 },
    { name: 'Shader Programming', icon: '✨', level: 70 },
    { name: 'UI/UX Design', icon: '🖱️', level: 75 },
  ];

  return (
    <section ref={ref} className="py-12 md:py-20 bg-gray-800/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-slideInLeft">
          SKILLS & TOOLS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-gray-800/50 rounded-lg p-3 md:p-4 border-2 border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:scale-105 animate-slideInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl md:text-4xl mb-2 animate-bounce" style={{ animationDelay: `${index * 100}ms` }}>{skill.icon}</div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-cyan-300">{skill.name}</h3>

              <div className="w-full bg-gray-700 rounded-full h-2 md:h-2.5">
                <div
                  className="bg-cyan-500 h-2 md:h-2.5 rounded-full transition-all duration-1000 ease-out animate-expandWidth"
                  style={{
                    width: `${skill.level}%`,
                    animationDelay: `${index * 150 + 500}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

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
              I'm Antrow Jefin, a passionate game developer with 2+ years of experience creating engaging
              mobile and desktop games. My journey began when I modded my first game at 14, and I've
              been hooked on game development ever since.
            </p>

            <p className="animate-slideInRight delay-400">
              I specialize in Unity and Unreal Engine development but enjoy experimenting with different engines and tools.
              My design philosophy centers around creating intuitive yet deep gameplay systems that reward
              player mastery.
            </p>

            <p className="animate-slideInRight delay-600">
              When I'm not coding, you can find me analyzing game mechanics, sketching level designs,
              or playing retro arcade games for inspiration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

const ContactSection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className="py-12 md:py-20 bg-gray-800/20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-slideInLeft">
            GET IN TOUCH
          </h2>

          <p className="text-blue-300 mb-8 text-base md:text-lg animate-fadeInUp delay-300">
            Interested in collaborating or just want to talk game design?
            Reach out through any of these channels.
          </p>

          <div className="flex justify-center gap-4 md:gap-6">
            {[
              { icon: LucideMail, href: "mailto:antrowjefin15@gmail.com", delay: "delay-500" },
              { icon: LucideGithub, href: "https://github.com/Antrow15", delay: "delay-700" },
              { icon: LucideLinkedin, href: "https://linkedin.com/in/antrow-jefin", delay: "delay-1000" }
            ].map(({ icon: Icon, href, delay }, index) => (
              <a
                key={index}
                href={href}
                target={href.startsWith('mailto:') ? undefined : "_blank"}
                rel={href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                className={`p-3 md:p-4 bg-gray-800 rounded-full border-2 border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all hover:scale-110 animate-slideInUp ${delay}`}
              >
                <Icon size={20} className="md:w-6 md:h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

const Footer = () => {
  return (
    <footer className="py-6 md:py-8 border-t-2 border-gray-800 text-center text-blue-300">
      <p className="text-sm md:text-base">© {new Date().getFullYear()} Antrow Jefin. All rights reserved.</p>
      <p className="text-xs md:text-sm mt-2">Made with ♥ and React</p>
    </footer>
  );
};

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes expandWidth {
    from {
      width: 0%;
    }
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .animate-slideInLeft {
    animation: slideInLeft 0.8s ease-out forwards;
  }

  .animate-slideInRight {
    animation: slideInRight 0.8s ease-out forwards;
  }

  .animate-slideInUp {
    animation: slideInUp 0.8s ease-out forwards;
  }

  .animate-expandWidth {
    animation: expandWidth 1.5s ease-out forwards;
    width: 0%;
  }

  .delay-200 {
    animation-delay: 200ms;
  }

  .delay-300 {
    animation-delay: 300ms;
  }

  .delay-400 {
    animation-delay: 400ms;
  }

  .delay-500 {
    animation-delay: 500ms;
  }

  .delay-600 {
    animation-delay: 600ms;
  }

  .delay-700 {
    animation-delay: 700ms;
  }

  .delay-1000 {
    animation-delay: 1000ms;
  }
`;
document.head.appendChild(style);

export default App;