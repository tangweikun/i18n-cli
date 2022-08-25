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

```jsx
// 转换前：
<Tooltip title="切换为当前环境的正常资源">当前</Tooltip>

// 预期：
<Tooltip title={window.t('切换为当前环境的正常资源')}>{window.t('当前')}</Tooltip>

// 实际：
<Tooltip title={window.t('切换为{window.t('当前')}环境的正常资源')}>当前</Tooltip>
```
