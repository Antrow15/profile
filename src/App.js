import React, { useState, useRef, useEffect } from 'react';
import { LucideGithub, LucideLinkedin, LucideMail, LucidePlay } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const sectionsRef = useRef({});

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    sectionsRef.current[sectionId]?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="bg-gray-900 text-cyan-400 min-h-screen font-mono">
      <main>
        <HeroSection 
          ref={(el) => sectionsRef.current.hero = el}
          onNavigate={scrollToSection}
        />
        <ShowreelSection ref={(el) => sectionsRef.current.showreel = el} />
        <GamesSection ref={(el) => sectionsRef.current.games = el} />
        <SkillsSection ref={(el) => sectionsRef.current.skills = el} />
        <AboutSection ref={(el) => sectionsRef.current.about = el} />
        <ContactSection ref={(el) => sectionsRef.current.contact = el} />
      </main>
      
      <Footer />
    </div>
  );
};

// Rocket Shooter Game Component
const RocketShooter = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef({
    rocket: { x: 50, y: 250, width: 40, height: 20 },
    asteroids: [],
    bullets: [],
    lastAsteroidSpawn: 0,
    animationId: null
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const game = gameRef.current;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      game.rocket.y = canvas.height / 2;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize some asteroids
    for (let i = 0; i < 5; i++) {
      game.asteroids.push({
        x: canvas.width + Math.random() * 400,
        y: Math.random() * (canvas.height - 40),
        size: 15 + Math.random() * 15,
        speed: 1 + Math.random() * 2
      });
    }

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move rocket up and down
      game.rocket.y = canvas.height/2 + Math.sin(timestamp * 0.003) * 50;

      // Draw rocket (simple triangle)
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.moveTo(game.rocket.x + game.rocket.width, game.rocket.y + game.rocket.height/2);
      ctx.lineTo(game.rocket.x, game.rocket.y);
      ctx.lineTo(game.rocket.x, game.rocket.y + game.rocket.height);
      ctx.closePath();
      ctx.fill();

      // Rocket exhaust
      ctx.fillStyle = '#ff6b35';
      ctx.beginPath();
      ctx.moveTo(game.rocket.x, game.rocket.y + 5);
      ctx.lineTo(game.rocket.x - 15, game.rocket.y + game.rocket.height/2);
      ctx.lineTo(game.rocket.x, game.rocket.y + game.rocket.height - 5);
      ctx.closePath();
      ctx.fill();

      // Spawn bullets regularly
      if (timestamp - game.lastAsteroidSpawn > 800) {
        game.bullets.push({
          x: game.rocket.x + game.rocket.width,
          y: game.rocket.y + game.rocket.height/2,
          speed: 4
        });
        game.lastAsteroidSpawn = timestamp;
      }

      // Update and draw bullets
      game.bullets = game.bullets.filter(bullet => {
        bullet.x += bullet.speed;
        
        // Draw bullet
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
        ctx.fill();

        return bullet.x < canvas.width + 10;
      });

      // Update and draw asteroids
      game.asteroids = game.asteroids.filter(asteroid => {
        asteroid.x -= asteroid.speed;

        // Check collision with bullets
        let hit = false;
        game.bullets = game.bullets.filter(bullet => {
          const dx = bullet.x - asteroid.x;
          const dy = bullet.y - asteroid.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < asteroid.size + 3) {
            hit = true;
            return false;
          }
          return true;
        });

        if (hit) {
          // Create explosion effect (simple particles)
          for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i;
            const particleX = asteroid.x + Math.cos(angle) * 10;
            const particleY = asteroid.y + Math.sin(angle) * 10;
            
            ctx.fillStyle = '#ff6b35';
            ctx.beginPath();
            ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          return false; // Remove asteroid
        }

        // Draw asteroid
        ctx.fillStyle = '#9d4edd';
        ctx.strokeStyle = '#c77dff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Draw rough asteroid shape
        const vertices = 8;
        for (let i = 0; i < vertices; i++) {
          const angle = (Math.PI * 2 / vertices) * i;
          const radius = asteroid.size * (0.7 + Math.sin(timestamp * 0.01 + i) * 0.3);
          const x = asteroid.x + Math.cos(angle) * radius;
          const y = asteroid.y + Math.sin(angle) * radius;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Respawn asteroid if it goes off screen
        if (asteroid.x < -asteroid.size) {
          asteroid.x = canvas.width + Math.random() * 200;
          asteroid.y = Math.random() * (canvas.height - 40);
        }

        return true;
      });

      // Ensure we always have asteroids
      while (game.asteroids.length < 5) {
        game.asteroids.push({
          x: canvas.width + Math.random() * 400,
          y: Math.random() * (canvas.height - 40),
          size: 15 + Math.random() * 15,
          speed: 1 + Math.random() * 2
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
      className="w-full h-full"
      style={{ maxHeight: '300px' }}
    />
  );
};

const HeroSection = React.forwardRef(({ onNavigate }, ref) => {
  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* L-Corner Design Elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-cyan-400"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-cyan-400"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-cyan-400"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-cyan-400"></div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block p-1 border-2 border-cyan-400 mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2">
              ANTROW JEFIN
            </h1>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            GAME DESIGNER & DEVELOPER
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-300 mb-12 max-w-3xl mx-auto">
            Crafting immersive worlds and engaging gameplay experiences across mobile and desktop platforms.
          </p>
        </div>

        {/* Rocket Shooter Game */}
        <div className="mb-12 h-64 bg-gray-800/30 rounded-lg border-2 border-cyan-400/30 p-4">
          <RocketShooter />
        </div>

        <div className="flex justify-center gap-6 mb-12">
          <button
            onClick={() => onNavigate('games')}
            className="px-8 py-3 bg-cyan-600 text-gray-900 font-bold rounded-md border-2 border-cyan-300 flex items-center gap-2 hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-400/30 transition-all"
          >
            <LucidePlay size={20} />
            VIEW MY GAMES
          </button>
          
          <button
            onClick={() => onNavigate('skills')}
            className="px-8 py-3 bg-transparent text-cyan-300 font-bold rounded-md border-2 border-purple-500 hover:bg-purple-500/20 hover:shadow-lg hover:shadow-purple-400/30 transition-all"
          >
            SKILLS & TOOLS
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="text-center">
          <div className="inline-flex space-x-8 bg-gray-800/50 px-6 py-3 rounded-full border border-cyan-400/30">
            {[
              { id: 'showreel', label: 'Showreel' },
              { id: 'games', label: 'Games' },
              { id: 'skills', label: 'Skills' },
              { id: 'about', label: 'About' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-cyan-300 hover:text-cyan-100 transition-colors font-bold hover:scale-110 transform transition-transform"
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

const ShowreelSection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className="py-20 bg-gray-800/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            3D RUNNER DEMO
          </h2>
          
          <div className="relative group">
            <div className="absolute inset-0 rounded-xl bg-cyan-500 opacity-20 group-hover:opacity-30 blur-md transition-all duration-300"></div>
            <div className="relative bg-gray-800 rounded-xl overflow-hidden border-2 border-cyan-500/30">
              <div className="w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎮</div>
                  <p className="text-cyan-300 text-xl">Demo Video Placeholder</p>
                  <p className="text-blue-300 text-sm mt-2">Click to play demo</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['Unity', 'C#', 'Blender', 'Shader Graph'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full border border-cyan-500/30 text-sm">
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

const GamesSection = React.forwardRef((props, ref) => {
  const games = [
    {
      title: "Neon Dash Runner",
      description: "Fast-paced endless runner with cyberpunk aesthetics and power-ups",
      tech: ['Unity', 'C#', 'Blender'],
      link: "https://play.google.com/store/apps/details?id=com.antrowjefin.neondash",
    },
    {
      title: "Pixel Galaxy Defender",
      description: "Retro-style space shooter with modern mechanics and upgrades",
      tech: ['Unity', 'C#', 'Photoshop'],
      link: "https://play.google.com/store/apps/details?id=com.antrowjefin.pixelgalaxy",
    },
    {
      title: "Cyber Puzzle Quest",
      description: "Match-3 game with cyberpunk narrative and special abilities",
      tech: ['Unity', 'C#', 'Aseprite'],
      link: "https://play.google.com/store/apps/details?id=com.antrowjefin.cyberpuzzle",
    },
  ];

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          PUBLISHED GAMES
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <div
              key={game.title}
              className="bg-gray-800/50 rounded-xl overflow-hidden border-2 border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-400/20"
            >
              <div className="h-48 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 flex items-center justify-center">
                <div className="text-5xl">👾</div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-cyan-300">{game.title}</h3>
                <p className="text-blue-300 mb-4">{game.description}</p>
                
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
                  className="inline-block px-4 py-2 bg-cyan-600 text-gray-900 font-bold rounded hover:bg-cyan-500 transition-colors"
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

const SkillsSection = React.forwardRef((props, ref) => {
  const skills = [
    { name: 'Unity', icon: '🎮', level: 95 },
    { name: 'Unreal Engine', icon: '🖥️', level: 80 },
    { name: 'C#', icon: '#️⃣', level: 90 },
    { name: 'Blender', icon: '🧊', level: 85 },
    { name: 'Photoshop', icon: '🖌️', level: 75 },
    { name: 'Git', icon: '📦', level: 80 },
    { name: 'Shader Programming', icon: '✨', level: 70 },
    { name: 'UI/UX Design', icon: '🖱️', level: 75 },
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-800/20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          SKILLS & TOOLS
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-gray-800/50 rounded-lg p-4 border-2 border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:scale-105"
            >
              <div className="text-4xl mb-2">{skill.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-cyan-300">{skill.name}</h3>
              
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-cyan-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${skill.level}%` }}
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
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            ABOUT ME
          </h2>
          
          <div className="space-y-4 text-blue-300 text-lg">
            <p>
              I'm Antrow Jefin, a passionate game developer with 5+ years of experience creating engaging 
              mobile and desktop games. My journey began when I modded my first game at 14, and I've 
              been hooked on game development ever since.
            </p>
            
            <p>
              I specialize in Unity development but enjoy experimenting with different engines and tools. 
              My design philosophy centers around creating intuitive yet deep gameplay systems that reward 
              player mastery.
            </p>
            
            <p>
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
    <section ref={ref} className="py-20 bg-gray-800/20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            GET IN TOUCH
          </h2>
          
          <p className="text-blue-300 mb-8 text-lg">
            Interested in collaborating or just want to talk game design? 
            Reach out through any of these channels.
          </p>
          
          <div className="flex justify-center gap-6">
            <a
              href="mailto:antrow@example.com"
              className="p-4 bg-gray-800 rounded-full border-2 border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all hover:scale-110"
            >
              <LucideMail size={24} />
            </a>
            
            <a
              href="https://github.com/antrowjefin"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-800 rounded-full border-2 border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all hover:scale-110"
            >
              <LucideGithub size={24} />
            </a>
            
            <a
              href="https://linkedin.com/in/antrowjefin"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-800 rounded-full border-2 border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all hover:scale-110"
            >
              <LucideLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

const Footer = () => {
  return (
    <footer className="py-8 border-t-2 border-gray-800 text-center text-blue-300">
      <p>© {new Date().getFullYear()} Antrow Jefin. All rights reserved.</p>
      <p className="text-sm mt-2">Made with ♥ and React</p>
    </footer>
  );
};

export default App;