# i18n-automatic

## Getting Start

```bash
yarn add i18n-automatic -D
```

## How to use

```bash
i18n-automatic scan
```

```bash
i18n-automatic pick
```

```bash
i18n-automatic exportJson
```

## config

如果当前目录下存在 `i18n.config.json` 则会优先读取其中的配置

```json
{
  "importStatement": "import { I18N } from '@common/I18N';",
  "callStatement": "I18N.get",
  "targetDir": "i18n-messages",
  "exclude": [],
  "callExpression": false,
  "path": "src",
  "autoZhKey": true
}
```

## babel

如果当前目录下存在 `i18n.babel.json` 则会优先读取其中的配置

TODO:

## TODO

- [ ] babel options support config
- [x] 提示信息使用 chalk
- [ ] 节点类型更准确
- [ ] ：: 不使用中文冒号
- [ ] 一个节点中文案出现重叠的情况，可能会出现重复翻译 【你好】【你好啊】
- [ ] i18n.t('common:search by {name}', { name: i18n.t('application') })
- [ ] https://konklone.io/json/

```jsx
// 转换前：
<Tooltip title="切换为当前环境的正常资源">当前</Tooltip>

// 预期：
<Tooltip title={window.t('切换为当前环境的正常资源')}>{window.t('当前')}</Tooltip>

// 实际：
<Tooltip title={window.t('切换为{window.t('当前')}环境的正常资源')}>当前</Tooltip>
```

- 两行文字的无法处理

```jsx
<div>
  这一年，我们总共为你推送了&nbsp; &nbsp;
  次个性化礼包，这些礼包，是基于你的喜好、兴趣、
  能力等，为你量身打造的。结果你在游戏中一次也没购买，一定是你手速太快，直接把页面关闭了对吗？
</div>
```

https://csvjson.com/csv2json
https://retool.com/utilities/convert-csv-to-json
```javascript
function arr2Obj(arr, lang = 'zh'){
    const res = {}
    return arr.filter(y => y.id).reduce((acc, x) => ({ ...acc, [x.id]: x[lang] || x.id }), {})
}
```

`foo.bar` 将无法被正确识别
`hello:world` 将无法被正确识别
```json
{
  "foo": "__foo__",
  "foo.bar": "__foo__bar__",
  "hello:world": "__hello__world"
}
```