const path = require("path");

const resolve = dir => path.resolve(__dirname, dir);

module.exports = async ({ config }) => {
  config.resolve = Object.assign(config.resolve, {
    alias: {
      "@dnd": resolve("../src/"),
      "@components": resolve("../src/components/"),
    }
  });

  return config;
};