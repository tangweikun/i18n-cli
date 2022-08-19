// https://astexplorer.net/

import React from "react";
import { Modal } from 'antd';

export default function Test(props) {
  const foo = "FOO"; // StringLiteral
  const bar = "BAR"; // StringLiteral
  const foobar = `你好`; // TemplateLiteral

  switch (foobar) {
    case "A":
      console.log("A-中文"); // StringLiteral
      break;
    default:
      console.log("DEFAULT-中文"); // StringLiteral
      break;
  }

  return (
    <div className="wrapper">
      <div>1-纯文本</div> {/* JSXElement JSXText */}

      <div>'2-带有单引号的纯文本'</div> {/* JSXElement JSXText */}

      <div>{'3-带有单引号的纯文本'}</div> {/* JSXExpressionContainer StringLiteral */}

      <div>"4-带有双引号的纯文本"</div> {/* JSXElement JSXText */}

      <div>{"5-带有双引号的纯文本"}</div> {/* JSXExpressionContainer StringLiteral */}

      <div>`6-带有反引号的纯文本`</div> {/* JSXElement JSXText */}

      <div>{`7-带有反引号的纯文本`}</div> {/* JSXExpressionContainer TemplateLiteral TemplateElement */}

      <div>{`${foo}8-变量混合文本`}</div> {/* JSXExpressionContainer TemplateLiteral TemplateElement */}

      <div>{`${foo}9-变量混合文本${bar}`}</div> {/* JSXExpressionContainer TemplateLiteral TemplateElement */}

      <div>
        10-纯文本单独一行  {/* JSXElement JSXText */}
      </div>

      <div>
        {`11-纯文本单独一行`} {/* JSXExpressionContainer TemplateLiteral TemplateElement */}
      </div>

      <Modal title="12-属性"></Modal> {/* JSXAttribute StringLiteral */}

      <Modal title={`13-属性`}></Modal> {/* JSXAttribute JSXExpressionContainer TemplateLiteral */}
    </div>
  );
}
