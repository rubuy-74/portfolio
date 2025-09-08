import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind'; // <-- Import the new integration

// https://astro.build/config
export default defineConfig({
	site: 'https://rubuy.me',
	vite: {
		server: {
			proxy: {
				'/api/check': {
					target: 'https://pstr-production.up.railway.app',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
	},

	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
		maxDuration: 8
	}),

	integrations: [
		react(),
		tailwind({
			configFile: './tailwind.config.js'
		})
	]
});
