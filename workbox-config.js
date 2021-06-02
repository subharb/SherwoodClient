module.exports = {
	globDirectory: 'build-hospital/',
	globPatterns: [
		'**/*.{json,png,ico,html,txt,css,js,gif,svg}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'build-hospital/sw.js'
};