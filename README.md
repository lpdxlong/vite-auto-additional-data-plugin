# vite-auto-additional-data-plugin

一个自动添加额外数据的插件

当一个Vite vue 项目存在多页时，每个页都需要引入一些公共的js文件,或者引用通用的css，这时就可以把这些公共的js文件添加到每个页的入口文件。

比如在项目中 创建一个 additionalData.js 文件，然后把需要添加的js文件引入进去，然后把 additionalData.js 添加到每个页的入口文件。



## Installation

```shell
npm install vite-auto-additional-data-plugin -D
```

## Usage

```javascript
// vite.config.js
import { additionalData } from 'vite-auto-additional-data-plugin'

export default defineConfig({
  // ...
  plugins: [
    additionalData({
        '/main.js'=>'import "../common/additionalData.js";',
       // ...
    })
  ]
  // ...
})
```

## License

[MIT](LICENSE) © 2024-present, bianlong
