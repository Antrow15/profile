import React, { useRef, useEffect } from 'react';

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

export default PixelRocketBackground;
