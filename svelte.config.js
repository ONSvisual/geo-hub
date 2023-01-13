/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-static';

const production = process.env.NODE_ENV === 'production';
const ons_build = process.env.PUBLIC_APP_PATH && process.env.PUBLIC_APP_PATH.includes('ons');
const static_build = process.env.PUBLIC_APP_PATH && process.env.PUBLIC_APP_PATH.includes('github');

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter({
			// Options below are defaults
			pages: 'build',
			assets: 'build',
			fallback: production && !ons_build && !static_build ? '404.html' : null
		}),
		prerender: {
			handleHttpError: 'warn'
		},
		paths: {
			base: production && ons_build ? '/visualisations/areas' : production ? '/geo-hub' : ''
		}
	}
};

export default config;