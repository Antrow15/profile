module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        vt323: ['VT323', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        cyan: {
          400: '#00f0ff',
          500: '#00c8d6',
          600: '#00a0aa',
        },
        purple: {
          500: '#4edda4ff',
        },
        blue: {
          300: '#7dd3fc',
        },
        gray: {
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00f0ff, 0 0 20px #00f0ff40',
        'neon-purple': '0 0 10px #4edda4ff, 0 0 20px #9d4edd40',
      },
    },
  },
  plugins: [],
}