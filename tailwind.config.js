/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./app/**/*.{js,ts,jsx,tsx}", // App Router
	  "./pages/**/*.{js,ts,jsx,tsx}", // Pages Router
	  "./components/**/*.{js,ts,jsx,tsx}", // Components
	],
	theme: {
	  extend: {
		colors: {
		  background: "#f8f9fa",
		  foreground: "#333333",
		},
		fontFamily: {
		  montserrat: ['Montserrat', 'sans-serif'],
		},
		animation: {
		  move: 'move 0.6s ease-in-out',
		  'fade-up': 'fade-up 380ms cubic-bezier(0.33, 1, 0.68, 1) both',
		  float: 'float 6s ease-in-out infinite',
		  wave: 'wave 1.1s ease-in-out infinite',
		  draw: 'draw 900ms cubic-bezier(0.33, 1, 0.68, 1) 500ms both',
		  strike: 'strike 600ms cubic-bezier(0.33, 1, 0.68, 1) 350ms both',
		  shimmer: 'shimmer 1.6s ease-in-out infinite',
		  pop: 'pop 420ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
		  breathe: 'breathe 1.8s ease-in-out infinite',
		  'fill-bar': 'fill-bar 1.5s linear both',
		},
		keyframes: {
		  move: {
			'0%, 49.99%': { opacity: '0', zIndex: '1' },
			'50%, 100%': { opacity: '1', zIndex: '5' },
		  },
		  'fade-up': {
			from: { opacity: '0', transform: 'translateY(6px)' },
			to: { opacity: '1', transform: 'translateY(0)' },
		  },
		  float: {
			'0%, 100%': { transform: 'translateY(0)' },
			'50%': { transform: 'translateY(-8px)' },
		  },
		  wave: {
			'0%, 100%': { transform: 'scaleY(0.35)' },
			'50%': { transform: 'scaleY(1)' },
		  },
		  draw: {
			from: { strokeDashoffset: '1' },
			to: { strokeDashoffset: '0' },
		  },
		  strike: {
			from: { transform: 'scaleX(0)' },
			to: { transform: 'scaleX(1)' },
		  },
		  shimmer: {
			'0%': { backgroundPosition: '200% 0' },
			'100%': { backgroundPosition: '-200% 0' },
		  },
		  pop: {
			'0%': { opacity: '0', transform: 'scale(0.6)' },
			'100%': { opacity: '1', transform: 'scale(1)' },
		  },
		  breathe: {
			'0%, 100%': { transform: 'scale(1)', opacity: '0.55' },
			'50%': { transform: 'scale(1.18)', opacity: '0' },
		  },
		  scan: {
			'0%, 100%': { transform: 'translateY(-60%)' },
			'50%': { transform: 'translateY(230px)' },
		  },
		  'fill-bar': {
			from: { transform: 'scaleX(0)' },
			to: { transform: 'scaleX(1)' },
		  },
		},
		boxShadow: {
		  whiteGlow: '0 5px 15px rgba(255, 255, 255, 0.35)',
		  // Ink-tinted (slate) shadows: soft, never flat black.
		  card: '0 1px 2px rgb(15 23 42 / 0.05), 0 4px 16px rgb(15 23 42 / 0.05)',
		  'card-hover': '0 2px 4px rgb(15 23 42 / 0.05), 0 12px 32px rgb(15 23 42 / 0.09)',
		  float: '0 8px 24px rgb(15 23 42 / 0.10), 0 1px 4px rgb(15 23 42 / 0.06)',
		},
		transitionTimingFunction: {
		  settle: 'cubic-bezier(0.33, 1, 0.68, 1)',
		  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }
