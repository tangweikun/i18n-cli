// https://astexplorer.net/

import React from "react";
import { Modal } from 'antd';

export default function Test(props) {
  const foo = "他和你"; // VariableDeclaration VariableDeclarator StringLiteral
  const bar = "我"; // VariableDeclaration VariableDeclarator StringLiteral
  const foobar = `你好`; // TemplateLiteral IGNORE:

  const leftData = {
    icon: require('./img/GG.png'), // ObjectProperty CallExpression StringLiteral IGNORE:
    icon2: require('assets/home/categoryDetail/活动营销-1.png'), // IGNORE:
    name: '嗷嗷', // VariableDeclarator ObjectExpression ObjectProperty StringLiteral
    desc: '啊啊啊啊啊', // VariableDeclarator ObjectExpression ObjectProperty StringLiteral
    title: !window.isStraEngine ? '哈哈哈' : '大大大', // ObjectProperty ConditionalExpression FIXME: 
    label: ['么么么哒', '阿斯顿发送到', '阿萨德发大水', '链接'],
    formatter: '{b0}: {c0}人', // FIXME:
    render(t) {
      if (t.profitType === '条件1') {
        return '李经理'; // ReturnStatement StringLiteral
      } else if (t.profitType === '条件2') {
        return '留存/流量计';
      } else if (t.profitType === '条件3') {
        return '阿斯顿发送到';
      } else {
        return null;
      }
    },
  };

  const [popoList, setPopoList] = useState([
    { name: 'ADSL发', corp: 'foo' }, // ArrayExpression ObjectExpression ObjectProperty StringLiteral
    { name: '啥地方', corp: 'bar' },
  ]);

    <div
    className={Styles.popo}
    onClick={() => {
      openPopo('aaa.com');
    }}
  >
    冷冻机房<div className={Styles.img}></div>
  </div>

  switch (foobar) {
    case "A":
      console.log("A-中文"); // StringLiteral
      message.success('我不怎么好' || '他真的好') // CallExpression LogicalExpression StringLiteral
      break;
    default:
      console.log("DEFAULT-中文"); // StringLiteral
      break;
  }

  if (content.trim()) {
    request({
      url: '/apollo/feedback/submit',
      data: {
        content,
        picPaths: fileList.map((item) => item.response.data),
      },
    }).then((res) => {
      if (res.data) {
        message.success('反馈成功'); // CallExpression StringLiteral
        props.cancel();
      }
    });
  } else {
    message.error('请填写您需要反馈的信息', '你就解决'); // CallExpression StringLiteral FIXME:
  }

  if (
    response &&
    response.data &&
    response.data.desc === '您没有查看权限' // IfStatement LogicalExpression BinaryExpression StringLiteral FIXME:
  ) {
    message.error(response.data.desc);
    setIsLoading(false);
  }

  return (
    <div className="wrapper">
      <div>1-纯文本</div> {/* JSXElement JSXText */}

      <div>'2-带有单引号的纯文本'</div> {/* JSXElement JSXText IGNORE: */}

      <div>{'3-带有单引号的纯文本'}</div> {/* JSXExpressionContainer StringLiteral FIXME: */}

      <div>"4-带有双引号的纯文本"</div> {/* JSXElement JSXText IGNORE: */}

      <div>{"5-带有双引号的纯文本"}</div> {/* JSXExpressionContainer StringLiteral FIXME: */}

      <div>`6-带有反引号的纯文本`</div> {/* JSXElement JSXText IGNORE: */}

      <div>{`7-带有反引号的纯文本`}</div> {/* JSXExpressionContainer TemplateLiteral TemplateElement IGNORE: */}

      <div>{`${foo}8-变量混合文本`}</div> {/* JSXExpressionContainer TemplateLiteral TemplateElement IGNORE: */}

      <div>{`${foo}9-变量混合文本${bar}`}</div> {/* JSXExpressionContainer TemplateLiteral TemplateElement IGNORE: */}

      <div>
        10-纯文本单独一行  {/* JSXElement JSXText */}
      </div>

      <div>
        {`11-纯文本单独一行`} {/* JSXExpressionContainer TemplateLiteral TemplateElement IGNORE: */}
      </div>

      <Modal title="12-属性"></Modal> {/* JSXAttribute StringLiteral */}

      <Modal title={`13-属性`}></Modal> {/* JSXAttribute JSXExpressionContainer TemplateLiteral IGNORE: */}

      <Tooltip title="切换使用"> {/* JSXAttribute StringLiteral */}
        本地 {/*  JSXElement JSXText */}
      </Tooltip>

      <Tooltip title="切换为当前环境的正常资源">当前</Tooltip> {/* FIXME: */}

      <div>{moment().format('YYYY年MM月DD日')}</div> {/* IGNORE: */}

      <Button
          type="primary"
          title="我的考虑"
          style={{ background: '#4860F8', borderColor: '#4860F8' }}
          onClick={goToNext}
        >
          查看
        </Button>

        {
          window ? <div>你好啊</div> : <div>不好啊</div>
        }
        <div className={styles.bottom}>
          {totalPayThisYear?.value <= 2000 &&
            '阿斯蒂芬离开就'}
          {totalPayThisYear?.value <= 10000 &&
            totalPayThisYear?.value > 2000 &&
            '驾驶的逻辑开发'}
          {totalPayThisYear?.value > 10000 && '爱上对方就lol~'}
      </div>

      <div>这有冒号:</div> {/* IGNORE: */}
      <div>这有点.</div> {/* IGNORE: */}

      <Option value={'力缆狂澜'}>力缆狂澜</Option>  {/* JSXAttribute JSXExpressionContainer */}
      <Option value="你好哈哈哈">你好哈哈哈</Option> {/* JSXAttribute StringLiteral */}
      <Option value={'用户答题时间-answer_time_cost'}>用户答题时间</Option> {/* JSXAttribute JSXExpressionContainer */}

      <div>
        了开酒啥地方&nbsp;
          <Span24>{warmWinRate?.showValue}</Span24>
          &nbsp;
          爱的色放
        </div>
        
        {!window.isStraEngine
            ? '啥的了防控就离开'
            : '爱上对方就两棵树的了福克斯的发酵'}
    </div>
  );
}