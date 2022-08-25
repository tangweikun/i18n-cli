const path = require("path");

const _config = {
  importStatement: "import { I18N } from '@common/I18N';",
  withImport: false,
  callStatement: "window.t",
  targetDir: "i18n-messages",
  exclude: [],
  callExpression: false,
  path: "src",
  autoZhKey: true,
};

module.exports = function () {
  let config = {};
  try {
    config = require(path.join(process.cwd(), "i18n.config.json"));
  } catch (e) {
    config = {};
  }
  return Object.assign({}, _config, config);
};
