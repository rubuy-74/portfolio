import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	site: 'https://rubuy.me',
	output: 'server',

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
