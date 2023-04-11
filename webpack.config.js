const path = require("path");
const webpack = require("webpack");

module.exports = {
  // Otras opciones de configuración de webpack aquí
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
    },
  },
};
