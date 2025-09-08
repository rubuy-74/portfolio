/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "#f8f9fa",
				primary: "#212529",
				secondary: "#6c757d",
				accent: "#0d6efd",
			}
		},
	},
	plugins: [],
}
