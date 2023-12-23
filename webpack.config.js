const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const cssLoaders = [parts.autoprefix()];
const path = require("path");

const commonConfig = merge([
  { entry: ["./src"] },
  parts.page({ title: "OpenLayers Helsinki Map" }),
  parts.extractCSS({ loaders: cssLoaders }),
  parts.loadImages({ limit: 15000 }),
  parts.clean(),
  parts.setVariable("MODE", mode),
]);
const developmentConfig = merge([
  {
    entry: ["webpack-plugin-serve/client"],
  },
  parts.devServer(),
]);

const productionConfig = merge([
  parts.eliminateUnusedCSS(),
  parts.generateSourceMaps({ type: "source-map" }),
  {
    optimization: {
      splitChunks: {
        chunks: "all",
      },
      runtimeChunk: {
        name: "runtime",
      },
    },
    recordsPath: path.join(__dirname, "records.json"),
  },
  parts.minifyJavaScript(),
  parts.minifyCSS({ options: { preset: ["default"] } }),
  {
    output: {
      chunkFilename: "[name].[contenthash].js",
      filename: "[name].[contenthash].js",
      assetModuleFilename: "[name].[contenthash][ext][query]",
    },
  },
]);

const getConfig = (mode) => {
  switch (mode) {
    case "production":
      return merge(commonConfig, productionConfig, { mode });
    case "development":
      return merge(commonConfig, developmentConfig, { mode });
    default:
      throw new Error(`Unknown mode: ${mode}`);
  }
};

console.log(getConfig(mode));

module.exports = getConfig(mode);
