// https://astexplorer.net/

import React from "react";
import { Modal } from 'antd';

export default function Test(props) {
  const foo = "他和你"; // VariableDeclaration VariableDeclarator StringLiteral
  const bar = "我"; // VariableDeclaration VariableDeclarator StringLiteral
  const foobar = `你好`; // TemplateLiteral

  const leftData = {
    icon: require('./img/用户画像.png'), // ObjectProperty CallExpression StringLiteral
    name: '用户画像', // VariableDeclarator ObjectExpression ObjectProperty StringLiteral
    desc: '联通全网易多源数据', // VariableDeclarator ObjectExpression ObjectProperty StringLiteral
  };

  const [popoList, setPopoList] = useState([
    { name: '林宇超', corp: 'linyuchao@corp.netease.com' }, // ArrayExpression ObjectExpression ObjectProperty StringLiteral
    { name: '饶俊阳', corp: 'hzraojunyang@corp.netease.com' },
  ]);

    <div
    className={Styles.popo}
    onClick={() => {
      openPopo('gzwanwei@corp.netease.com');
    }}
  >
    万伟<div className={Styles.img}></div>
  </div>

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

      <div>'2-带有单引号的纯文本'</div> {/* JSXElement JSXText 不处理 */}

      <div>{'3-带有单引号的纯文本'}</div> {/* JSXExpressionContainer StringLiteral 不处理 */}

      <div>"4-带有双引号的纯文本"</div> {/* JSXElement JSXText 不处理 */}

      <div>{"5-带有双引号的纯文本"}</div> {/* JSXExpressionContainer StringLiteral 不处理 */}

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

      <Tooltip title="切换使用"> {/* JSXAttribute StringLiteral */}
        本地 {/*  JSXElement JSXText */}
      </Tooltip>

      {/* <Tooltip title="切换为当前环境的正常资源">当前</Tooltip> */} 

      <Button
          type="primary"
          title="查看我的2021游戏历程"
          style={{ background: '#4860F8', borderColor: '#4860F8' }}
          onClick={goToNext}
        >
          查看
        </Button>
    </div>
  );
}