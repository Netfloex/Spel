// @ts-check

const { join } = require("path")

/**
 * @type {import('next').NextConfig}
 **/

const config = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		outputStandalone: true,
	},
	sassOptions: {
		includePaths: [join(__dirname, "src", "styles")],
	},
}

const withAnalyzer = process.env.ANALYZE
	? require("@next/bundle-analyzer")()
	: (/** @type {import('next').NextConfig} */ config) => config

module.exports = withAnalyzer(config)
