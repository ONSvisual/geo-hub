/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-static';

const production = process.env.NODE_ENV === 'production';
const ons_path = process.env.APP_PATH && process.env.APP_PATH.includes('ons');

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter({
			// Options below are defaults
			pages: 'build',
			assets: 'build',
			fallback: production && !ons_path ? '404.html' : null
		}),
		prerender: {
			handleHttpError: 'warn'
		},
		paths: {
			base: production && ons_path ? '/visualisations/areas' : production ? '/geo-hub' : ''
		}
	}
};

export default config;