import { viteCommonjs } from '@originjs/vite-plugin-commonjs'


// This is to get Puppeteer (and ultimately capture-website) working for the
// social-image-generator.js script.
const ignoredPackages = [
	'node:process', 'node:fs',
	'file-url',
	'puppeteer',
	'tough-cookie', 
]

export default ({
	renderers: [],
	vite: {
		optimizeDeps: { exclude: ignoredPackages },
		ssr: { external: ignoredPackages },
		plugins: [ viteCommonjs() ],
	},
})