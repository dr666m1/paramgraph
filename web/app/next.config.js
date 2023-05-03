const LicensePlugin = require("webpack-license-plugin")

const myConfig = (config, { isServer, dev }) => {
  config.plugins.push(new LicensePlugin())
}

// https://github.com/vercel/next.js/issues/29362
const wasmConfig = (config, { isServer, dev }) => {
  config.experiments.asyncWebAssembly = true
  config.experiments.layers = true
  if (!dev && isServer) {
    config.output.webassemblyModuleFilename = "chunks/[id].wasm";
    config.plugins.push(new WasmChunksFixPlugin());
  }
}
class WasmChunksFixPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("WasmChunksFixPlugin", (compilation) => {
      compilation.hooks.processAssets.tap(
        { name: "WasmChunksFixPlugin" },
        (assets) =>
          Object.entries(assets).forEach(([pathname, source]) => {
            if (!pathname.match(/\.wasm$/)) return;
            compilation.deleteAsset(pathname);
            const name = pathname.split("/")[1];
            const info = compilation.assetsInfo.get(pathname);
            compilation.emitAsset(name, source, info);
          })
      );
    });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  webpack: (config, { isServer, dev }) => {
    myConfig(config, { isServer, dev })
    wasmConfig(config, { isServer, dev })
    return config
  },
}

module.exports = nextConfig
