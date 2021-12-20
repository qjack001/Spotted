import captureWebsite from 'capture-website'
import { readFileSync } from 'fs'

/**
 * Generated image previews for pages, shown when sharing the URL on social
 * media. Generated a styled webpage and opens it in headless-Chrome (using
 * Puppeteer). Screenshots the generated site and saves the image to the
 * social-media folder. This is done in the metadata.astro file for every page.
 * 
 * If this process has yet to concern you: all the HTML and CSS is written in
 * a couple big strings because I'm lazy. I am sorry.
 */

export default {
	/**
	 * Creates a new social media image preview (the ones that appear when you
	 * share a link on Twitter, Messenger, etc.) with the title of the page and
	 * an image. The generated image is outputted to the social-media/ directory
	 * as <imageId>.png.
	 * 
	 * @param {String} title of page
	 * @param {String} imageId of a PNG image in the images/ directory
	 */
	async generate(title, imageId) {
		console.log('Generating social media share image for', title)

		const imagePath = `public/images/${imageId}.png`
		const inputFile = this.buildTemplate(title, imagePath)
		const outputDestination = `public/social-media/${imageId}.png`

		await captureWebsite.file(inputFile, outputDestination, { 
			inputType: 'html',
			width: 1200,
			height: 630,
			delay: 5, // ensure font has loaded
			overwrite: true,
		})
	},

	/**
	 * Assembles and fills-in the HTML template used for the image.
	 * @returns built template as a String.
	 */
	buildTemplate(title, imagePath) {

		const cssBlock = this.getStyling()
		const inputtedImage = this.base64Image(imagePath)

		return `
			<!DOCTYPE html>
			<html>
				<head>
					<meta charset="utf-8">
					<style>${cssBlock}</style>
				</head>
				<body>
					<div id="container">
						<img src="${inputtedImage}" id="inputImage"/>
						<h1>${title}</h1>
					</div>
				</body>
			</html>
		`
	},

	/**
	 * Declares styling rules for the image. Todo: move to separate CSS file
	 * and read in contents instead.
	 * @returns CSS block as a String
	 */
	getStyling() {
		return `
			html, body
			{
				background: hsl(89deg 86% 95% / 1);
				margin: 0;
			}

			#container
			{
				/* side-by-side content */
				display: grid;
				grid-template-columns: 3fr 4fr;
				gap: 20px;
				align-items: center;

				/* visually centered */
				margin: 100px auto;
				padding: 40px 140px;
			}

			#inputImage
			{
				max-width: 350px;
				height: 350px;
				object-fit: contain;
				display: block;
				justify-self: end;

				mix-blend-mode: multiply;
			}

			h1
			{
				font-family: "Tekst", serif;
				font-size: 96px;
				font-weight: normal;
				line-height: 1;
				color: hsl(136deg 65% 5% / 0.8);
				margin: 0;
			}

			@font-face 
			{
				font-family: 'Tekst';
				src: url('https://fonts.goodbyte.ca/tekst-italic.woff2') format('woff2');
			}
		`
	},

	/**
	 * Convert local images to base64 strings. This allows local resources to be
	 * loaded in Puppeteer despite using `setContent` behind the scenes.
	 */
	base64Image(imagePath) {
		const base64Content = readFileSync(imagePath).toString('base64')
		return `data:image/jpeg;base64,${base64Content}`
	},
}