/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./app/**/*.{js,ts,jsx,tsx}", // For Next.js App Router
	  "./pages/**/*.{js,ts,jsx,tsx}", // For Pages Router
	  "./components/**/*.{js,ts,jsx,tsx}", // If using components
	],
	theme: {
	  extend: {
		colors: {
		  background: "#f8f9fa", // Replace with your preferred color
		  foreground: "#333333", // Replace with your preferred text color
		},
	  },
	},
	plugins: [],
  };
  