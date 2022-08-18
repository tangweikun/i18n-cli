const fs = require("fs");
const path = require("path");
const config = require("./config")();
const { logSuccess, logError } = require("./log");
const dir = config.targetDir;

const targetPath = `${dir}/zh_CN.json`;
const srcPath = path.join(process.cwd(), dir, "zh-CH.json");

function exportJson() {
  let data = [];
  try {
    data = require(srcPath);
  } catch (e) {
    logError("获取映射文件出错！", e);
    return;
  }

  const result = {};
  data.forEach((d) => {
    if (result[d.id]) {
      return logError(`"${d.defaultMessage}"与"${result[d.id]}" key 值相同，请修改！`);
    }
    result[d.id] = d.defaultMessage;
  });
  // DONE: 重写 targetPath 文件
  fs.writeFile(targetPath, JSON.stringify(result, null, "\t"), function (err) {
    if (err) {
      return logError(err);
    }

    logSuccess("----导出到 zh_CN.js ----");
  });
}

module.exports = exportJson;
