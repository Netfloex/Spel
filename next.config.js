// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const config = {
	eslint: {
		ignoreDuringBuilds: true,
	},
}

const withTM = require("next-transpile-modules")(["three"])

module.exports = withTM(config)
