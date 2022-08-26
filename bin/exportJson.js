const fs = require("fs");
const path = require("path");
const config = require("./config")();

const dir = config.targetDir;

const targetPath = `${dir}/zh.json`;
const enPath = `${dir}/en.json`;
const jaPath = `${dir}/ja.json`;
const srcPath = path.join(process.cwd(), dir, "zh-CH.json");

function exportJson() {
  let data = [];
  try {
    data = require(srcPath);
  } catch (e) {
    console.log("获取映射文件出错！", e);
    return;
  }
  const result = {};
  const enResult = {}
  const jaResult = {}

  data.forEach((d) => {
    if (result[d.id]) return console.log(`"${d.defaultMessage}"与"${result[d.id]}" key 值相同，请修改！`);
    result[d.id] = d.defaultMessage;
    enResult[d.id] = '__EN__' + d.defaultMessage
    jaResult[d.id] = '__JA__' + d.defaultMessage
  });

  // DONE: 重写 targetPath 文件
  fs.writeFile(targetPath, JSON.stringify(result, null, "\t"), function (err) {
    if (err) return console.error(err);
    console.log("----导出到 zh.json ----");
  });

  fs.writeFile(jaPath, JSON.stringify(jaResult, null, "\t"), function (err) {
    if (err) return console.error(err);
    console.log("----导出到 ja.json ----");
  });

  fs.writeFile(enPath, JSON.stringify(enResult, null, "\t"), function (err) {
    if (err) return console.error(err);
    console.log("----导出到 en.json ----");
  });
}

module.exports = exportJson;
