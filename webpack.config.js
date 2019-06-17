const path = require("path")
const { DefinePlugin, IgnorePlugin } = require("webpack")
const DotenvPlugin = require("dotenv-webpack")
const CopyPlugin = require("copy-webpack-plugin")
const nodeExternals = require("webpack-node-externals")

module.exports = env => {
  return {
    externals: [nodeExternals()],
    entry: "./src/index.ts",
    mode: "development",
    target: "node",
    plugins: [
      new IgnorePlugin(/^pg-native$/),
      new DotenvPlugin(),
      new DefinePlugin({ "global.GENTLY": false }),
      new CopyPlugin([{ from: "src/models/data/", to: "data/" }]),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.csv$/,
          use: "raw-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".tsx", ".ts", ".js", ".json"],
    },
    output: {
      filename: "app.js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      filename: "app.js",
      compress: true,
      port: 8080,
    },
  }
}
