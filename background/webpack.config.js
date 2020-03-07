const path = require("path");

module.exports = {
  entry: ["./background/src/background.js"],

  output: {
    filename: "background.js",
    path: path.join(__dirname, "../", "build"),
    publicPath: "/"
  },

  resolve: {
    extensions: [".js", ".jsx", ".scss", ".json"],
    modules: ["node_modules"]
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        include: path.join(__dirname, "src"),
        query: {
          presets: ["@babel/env", "@babel/react"]
        }
      }
    ]
  }
};
