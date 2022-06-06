/** @type {import('next').NextConfig} */
const path = require("path");
const nextTranslate = require("next-translate");
const withPlugins = require("next-compose-plugins");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = withPlugins([[nextConfig], [nextTranslate]]);
