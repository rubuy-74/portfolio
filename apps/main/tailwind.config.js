/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "#262624",
				primary: "#212529",
				secondary: "#c96442",
				accent: "#0d6efd",
			}
		},
	},
	plugins: [],
}
