const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    script: path.resolve(__dirname, "../src/script.js"),
    pages: path.resolve(__dirname, "../src/pages.js"),
  },
  output: {
    hashFunction: "xxhash64",
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "../static") }],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../src/index.html"),
      chunks: ["script"],
      minify: true,
    }),
    new HtmlWebpackPlugin({
      filename: "about/index.html",
      template: path.resolve(__dirname, "../src/about/index.html"),
      chunks: ["pages"],
      minify: true,
    }),
    new HtmlWebpackPlugin({
      filename: "partners/index.html",
      template: path.resolve(__dirname, "../src/partners/index.html"),
      chunks: ["pages"],
      minify: true,
    }),
    new HtmlWebpackPlugin({
      filename: "partners/state/index.html",
      template: path.resolve(__dirname, "../src/partners/state/index.html"),
      chunks: ["pages"],
      minify: true,
    }),
    new HtmlWebpackPlugin({
      filename: "partners/state/texas/index.html",
      template: path.resolve(
        __dirname,
        "../src/partners/state/texas/index.html"
      ),
      chunks: ["pages"],
      minify: true,
    }),
    new HtmlWebpackPlugin({
      filename: "partners/host-restaurant/index.html",
      template: path.resolve(
        __dirname,
        "../src/partners/host-restaurant/index.html"
      ),
      chunks: ["pages"],
      minify: true,
    }),
    new HtmlWebpackPlugin({
      filename: "partners/virtual-restaurant/index.html",
      template: path.resolve(
        __dirname,
        "../src/partners/virtual-restaurant/index.html"
      ),
      chunks: ["pages"],
      minify: true,
    }),

    new MiniCSSExtractPlugin(),
  ],
  module: {
    rules: [
      // HTML
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },

      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      // CSS
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader"],
      },

      // Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },

      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      },
    ],
  },
};
