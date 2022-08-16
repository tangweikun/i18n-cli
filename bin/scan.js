const glob = require("glob");
const fs = require("fs");
const rimraf = require("rimraf");
const transformFileSync = require("@babel/core").transformFileSync;
const config = require("./config")();
const babelConfig = require("./babelConfig")();
babelConfig.plugins.push(scan);

const textArr = [];
const zhCH = new Map();
const templateLiteralArr = [];

const targetDir = config.targetDir;
const exclude = config.exclude;
const callExpression = config.callExpression;
const path = config.path;

function run() {
  // Step1: 遍历所有符合条件的文件
  glob(
    `${path}/**/*.{js,jsx,ts,tsx}`,
    {
      ignore: exclude.map((pattern) => `${path}/${pattern}`),
    },
    (_, files) => {
      files.forEach((filename) => {
        // 过滤 node_modules
        if (filename.includes("node_modules")) {
          return;
        }

        transformFileSync(filename, babelConfig);
      });

      rimraf.sync(targetDir);
      // 创建文件夹
      fs.mkdirSync(targetDir);
      fs.appendFile(`${targetDir}/sourcemap.txt`, textArr.map((item, i) => `${item}#${i}\n`).join(""), function (err) {
        if (err) {
          return console.error(err);
        }
        console.log(`----共扫描中文文案 ${textArr.length} 条----`);
      });

      fs.appendFile(`${targetDir}/zh-CH.json`, `${JSON.stringify([...zhCH.values()], null, "\t")}`, function (err) {
        if (err) {
          return console.error(err);
        }
        console.log(`----去重后中文文案为 ${zhCH.size} 条----`);
      });

      // 模板字符串暂不处理，只是找出来
      fs.appendFile(
        `${targetDir}/templateLiteral.txt`,
        templateLiteralArr.map((item, i) => `${item}#${i}\n`).join(""),
        function (err) {
          if (err) {
            return console.error(err);
          }
          console.log(`----共扫描中文模板字符串 ${templateLiteralArr.length} 条----`);
        }
      );
    }
  );
}

function scan() {
  return {
    visitor: {
      JSXAttribute(path) {
        if (path.node.name.name !== "defaultMessage" && path.node.value) {
          detectChinese(path.node.value.value, path, "jsx", "JSXAttribute");
        }
      },
      JSXText(path) {
        detectChinese(path.node.value, path, "jsx", "JSXText");
      },
      AssignmentExpression(path) {
        detectChinese(path.node.right.value, path, "text", "AssignmentExpression");
      },
      ObjectProperty(path) {
        detectChinese(path.node.value.value, path, "text", "ObjectProperty");
      },
      ArrayExpression(path) {
        path.node.elements.forEach((item) => {
          if (item.value) {
            detectChinese(item.value, Object.assign({}, path, { node: item }), "text", "ArrayExpression");
          }
        });
      },
      NewExpression(path) {
        path.node.arguments.forEach((item) => {
          detectChinese(item && item.value, path, "text", "NewExpression");
        });
      },
      CallExpression(path) {
        if (path.node.callee && path.node.callee.object) {
          if (path.node.callee.object.name === "console") {
            return;
          }
          if (path.node.callee.object.name === "React") {
            return;
          }
        }

        path.node.arguments.forEach((item) => {
          callExpression && detectChinese(item && item.value, path, "text", "CallExpression");
        });
      },
      SwitchCase(path) {
        if (path.node && path.node.test) {
          detectChinese(path.node.test.value, path, "text", "SwitchCase");
        }
      },
      StringLiteral(path) {
        // TODO:
      },
      TemplateLiteral(path) {
        path.node.quasis.forEach((x) => {
          const { node } = path;
          const startLine = node.loc ? node.loc.start.line : "NOT_FOUND";
          const startColumn = node.loc ? node.loc.start.column : "NOT_FOUND";
          const location = `${path.hub.file.opts.filename}#${startLine}#${startColumn}`;
          const sourceText = `${x.value.raw}#${location}`;
          const notExist = templateLiteralArr.indexOf(`${sourceText}`) === -1;
          const zhText = x.value.raw;
          if (/[\u4e00-\u9fa5]/.test(zhText)) {
            if (notExist) {
              // 没有扫描过
              templateLiteralArr.push(sourceText);
            }
          }
        });
      },
    },
  };
}

function detectChinese(text, path, type, babelType) {
  if (/[\u4e00-\u9fa5]/.test(text)) {
    report(text, path, type, babelType);
  }
}

function report(text, path, type, babelType) {
  const { node } = path;
  const startLine = node.loc ? node.loc.start.line : "NOT_FOUND";
  const startColumn = node.loc ? node.loc.start.column : "NOT_FOUND";
  const location = `${path.hub.file.opts.filename}#${startLine}#${startColumn}`;

  let zhText = text.replace(/"/g, '\\"');
  zhText = type === "jsx" ? zhText.trim() : zhText;

  const sourceText = `${zhText}#${location}`;
  const notExist = textArr.indexOf(`${sourceText}`) === -1;

  if (notExist) {
    // 没有扫描过

    textArr.push(sourceText);
    // 中文文案已存在
    if (zhCH.has(zhText)) {
      const data = zhCH.get(zhText);
      data.source.push({ type, location, babelType });
      zhCH.set(zhText, data);
    } else {
      // 中文文案不存在
      zhCH.set(zhText, {
        id: zhText,
        defaultMessage: zhText,
        source: [
          {
            type,
            location,
            babelType,
          },
        ],
      });
    }
  }
}

module.exports = {
  run,
};
