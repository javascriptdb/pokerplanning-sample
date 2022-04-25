import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown
			pages: '.jsdb/hosting',
			assets: '.jsdb/hosting',
			fallback: 'index.html',
			precompress: false
		}),
		prerender: {
			default: false
		}
	}
};

export default config;
