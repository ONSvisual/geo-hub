/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-static';

const production = process.env.NODE_ENV === 'production';
const preview = process.env.PUBLIC_APP_PATH && process.env.PUBLIC_APP_PATH.includes('github');

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter({
			// Options below are defaults
			pages: 'build',
			assets: 'build',
			fallback: production && preview ? '404.html' : null
		}),
		prerender: {
			handleHttpError: 'warn'
		},
		paths: {
			// assets: production && ons_build ? 'https://www.ons.gov.uk/visualisations/areas' : null,
			base: production && preview ? '/geo-hub' : production ? '/visualisations/areas' : '',
			relative: false
		}
	}
};

export default config;