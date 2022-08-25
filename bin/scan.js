const glob = require("glob");
const fs = require("fs");
const rimraf = require("rimraf");
const transformFileSync = require("@babel/core").transformFileSync;
const config = require("./config")();
const babelConfig = require("./babelConfig")();
const { logSuccess, logError } = require("./log");
babelConfig.plugins.push(markChineseText);

const ignoreTextList = [];
const sourceTextList = [];
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

      // 创建文件夹
      rimraf.sync(targetDir);
      fs.mkdirSync(targetDir);
      fs.appendFile(
        `${targetDir}/sourcemap.txt`,
        sourceTextList.map((item, i) => `${item}#${i}\n`).join(""),
        function (err) {
          if (err) {
            return logError(err);
          }
          logSuccess(`----共扫描中文文案 ${sourceTextList.length} 条，已记录到 ${targetDir}/sourcemap.txt----`);
        }
      );

      fs.appendFile(`${targetDir}/zh-CH.json`, `${JSON.stringify([...zhCH.values()], null, "\t")}`, function (err) {
        if (err) {
          return logError(err);
        }
        logSuccess(`----去重后中文文案 ${zhCH.size} 条，已记录到 ${targetDir}/zh-CH.json----`);
      });

      // 模板字符串暂不处理，只是找出来
      fs.appendFile(
        `${targetDir}/templateLiteral.txt`,
        templateLiteralArr.map((item, i) => `${item}#${i}\n`).join(""),
        function (err) {
          if (err) {
            return logError(err);
          }
          logSuccess(`----共扫描中文模板字符串 ${templateLiteralArr.length} 条----`);
        }
      );

      // 暂不处理，只是找出来
      fs.appendFile(
        `${targetDir}/ignoreText.txt`,
        ignoreTextList.map((item, i) => `${item}#${i}\n`).join(""),
        function (err) {
          if (err) {
            return logError(err);
          }
          logSuccess(`----共扫描无法自动处理中文 ${ignoreTextList.length} 条----`);
        }
      );
    }
  );
}

function markChineseText() {
  return {
    visitor: {
      VariableDeclarator(path) {
        detectChinese(path.node.init.value, path, "text", "VariableDeclarator");
      },
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
      JSXExpressionContainer(path) {
        detectChinese(path.node?.expression?.value, path, "text", "JSXExpressionContainer");
      },
      StringLiteral(path) {
        // TODO:
      },
      TemplateLiteral(path) {
        path.node.quasis.forEach((x) => {
          const { node } = path;
          const startLine = node.loc?.start?.line ?? "NOT_FOUND";
          const startColumn = node.loc?.start?.column ?? "NOT_FOUND";
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
  if (!/[\u4e00-\u9fa5]/.test(text)) {
    // 如果不是中文则不进行处理
    return;
  }

  const { node, hub } = path;
  const startLine = node.loc?.start?.line ?? "NOT_FOUND";
  const startColumn = node.loc?.start?.column ?? "NOT_FOUND";
  const location = `${hub.file.opts.filename}#${startLine}#${startColumn}`;

  // FIXME:
  let zhText = text.replace(/"/g, '\\"');
  zhText = type === "jsx" ? zhText.trim() : zhText;
  const sourceText = `${zhText}#${location}`;
  const hasEmptyLine = /^(\n|\r)/.test(text) // 是否包含换行符

  const hasScanned = sourceTextList.indexOf(`${sourceText}`) !== -1;
  if (hasScanned) {
    // 已扫描过
    return;
  }

  // 不处理以 ' " ` 开头的中文
  if (sourceText.includes("'") || sourceText.includes('"') || sourceText.includes("`")) {
    ignoreTextList.push(sourceText);
    return;
  }

  if (['JSXExpressionContainer', 'VariableDeclarator', 'JSXAttribute', 'ObjectProperty'].includes(babelType)) {
    ignoreTextList.push(sourceText);
    return;
  }

  sourceTextList.push(sourceText);

  if (zhCH.has(zhText)) {
    // 中文文案已存在
    const data = zhCH.get(zhText);
    data.source.push({ type, location, babelType, hasEmptyLine });
    zhCH.set(zhText, data);
  } else {
    // 中文文案不存在
    zhCH.set(zhText, {
      id: zhText,
      defaultMessage: zhText,
      source: [{ type, location, babelType, hasEmptyLine }],
    });
  }
}

module.exports = {
  run,
};
