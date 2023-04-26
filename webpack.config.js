const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

exports.default = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.ts",
  output: {
    // clean: true,
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /(tick|bin)\.svg$/,
        type: "asset/inline",
      },
      {
        test: /\.svg$/,
        exclude: path.resolve(__dirname, "src/assets/inline"),
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new HtmlWebpackPlugin({ template: "index.html" })],
};
