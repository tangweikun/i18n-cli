// https://astexplorer.net/

import React from "react";
import { Modal } from 'antd';

export default function Test(props) {
  const foo = "他和你"; // VariableDeclaration VariableDeclarator StringLiteral
  const bar = "我"; // VariableDeclaration VariableDeclarator StringLiteral
  const foobar = `你好`; // TemplateLiteral IGNORE:

  const leftData = {
    icon: require('./img/用户画像.png'), // ObjectProperty CallExpression StringLiteral IGNORE:
    icon2: require('assets/home/categoryDetail/活动营销-1.png'), // IGNORE:
    name: '用户画像', // VariableDeclarator ObjectExpression ObjectProperty StringLiteral
    desc: '联通全网易多源数据', // VariableDeclarator ObjectExpression ObjectProperty StringLiteral
    title: !window.isStraEngine ? '提升游戏的付费指标' : '促进游戏营收增长', // ObjectProperty ConditionalExpression FIXME: 
    label: ['实时队友推荐', '智能组队匹配', '温暖局推荐', '直播推荐'],
    render(t) {
      if (t.profitType === '条件1') {
        return '消费类直接提升'; // ReturnStatement StringLiteral
      } else if (t.profitType === '条件2') {
        return '留存/付费间接提升';
      } else if (t.profitType === '条件3') {
        return '体验类利润折算';
      } else {
        return null;
      }
    },
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
          title="查看我的2021游戏历程"
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
            '你在花钱方面较为理性、克制，希望明年冲冲冲！'}
          {totalPayThisYear?.value <= 10000 &&
            totalPayThisYear?.value > 2000 &&
            '猪厂赚钱猪厂花，果然是自家人'}
          {totalPayThisYear?.value > 10000 && '原来你是潜藏的氪金大佬，失敬失敬~'}
      </div>

      <Option value={'机器学习平台监控'}>机器学习平台监控</Option>  {/* JSXAttribute JSXExpressionContainer */}
      <Option value="你好哈哈哈">你好哈哈哈</Option> {/* JSXAttribute StringLiteral */}
      <Option value={'用户答题时间-answer_time_cost'}>用户答题时间</Option> {/* JSXAttribute JSXExpressionContainer */}

      <div>
        你的温暖局胜率是&nbsp;
          <Span24>{warmWinRate?.showValue}</Span24>
          &nbsp;
          。在这里想跟你说：既然决定战斗，就不要管对手是谁，每一场都要全力以赴，好好加油
        </div>
        
        {!window.isStraEngine
            ? '解决玩家个性化需求问题，基于大数据，采用先进的机器学习算法，向用户提供“千人千面”的个性化内容，可以提升运营效果和玩家体验。'
            : '采用先进智能的分发技术，根据玩家不同兴趣和需求，向玩家提供千人千面的个性化内容，带来更优质的游戏体验，实现高效精细化运营，促进业务增长。'}
    </div>
  );
}