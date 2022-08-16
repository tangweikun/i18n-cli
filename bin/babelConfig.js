const _config = {
  presets: [
    ["@babel/preset-typescript", { allExtensions: true, isTSX: true }],
    [
      "@babel/env",
      {
        targets: "chrome > 58",
        modules: false,
        useBuiltIns: false,
        loose: false,
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-transform-typescript",
    "@babel/plugin-syntax-typescript",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
  ],
};

module.exports = function () {
  let config = {};
  try {
    config = require(path.join(process.cwd(), "i18n.babel.json"));
  } catch (e) {
    config = {};
  }
  return Object.assign({}, _config, config);
};
