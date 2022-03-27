// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const config = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		outputStandalone: true,
	},
}

const withTM = require("next-transpile-modules")(["three"])

module.exports = withTM(config)
