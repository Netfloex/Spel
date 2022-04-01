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

// const withTM = require("next-transpile-modules")(["three"])

// module.exports = withTM(config)
module.exports = config
