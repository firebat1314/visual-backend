var path = require("path");

module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "页面装修";
      // favicon: "./public/favicon.ico",
      // template: "./public/index.html",
      // inject: true,
      return args;
    });
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9093,
  },
};
