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