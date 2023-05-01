const LicensePlugin = require("webpack-license-plugin")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  webpack: (config) => {
    config.plugins.push(new LicensePlugin())

    config.experiments.syncWebAssembly = true
    config.experiments.asyncWebAssembly = true
    return config
  },
}

module.exports = nextConfig
