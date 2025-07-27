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
		},
		keyframes: {
		  move: {
			'0%, 49.99%': { opacity: '0', zIndex: '1' },
			'50%, 100%': { opacity: '1', zIndex: '5' },
		  },
		},
		boxShadow: {
		  whiteGlow: '0 5px 15px rgba(255, 255, 255, 0.35)',
		},
	  },
	},
	plugins: [],
  }
  