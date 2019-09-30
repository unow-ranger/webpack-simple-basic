# webpack-simple-basic

本项目以webpack-simple-template为模版，逐步讲解关于vue-webpack项目中的使用到的技术，以及其配置文件中的内容解析，同时在讲解基础上逐步扩展项目功能，内容由浅至深。

在开发过程中，根据需求逐步安装相应的模块和解释其作用。同时，在着手开发之前，请确认环境搭建已完备（node，vue-cli），也需要简单了解相关webpack知识、es6语法。

> 若有说法不当之处，请指点一二，谢谢🙏

## 1. 搭建项目
### 1.1. webpack-simple模版

- **创建基础项目模版**

进入终端（cmd），命令输入
```bash
# 创建 vue-webapck-simple-template，后续会弹出一系列确认信息，一致回车通过
vue init webpack-simple your-project
```
![0](./assets/0.png)
```bash
# 进入新建的项目目录
cd your-project

# 安装依赖
npm install
```


此时项目目录如下：

![1](./assets/1.png)

- **helloWorld测试**

进入终端（cmd），命令输入

```bash
npm run dev
```

此时浏览器弹出以下页面，即第一个HelloWorld运行成功。

![2](./assets/2.png)

- 打包测试

进入终端（cmd），命令输入

```bash
npm run build
```

输出内容如下，且项目目录出现dist目录，即打包成功（无法直接通过打开index.html查看效果，需要将index.html和dist目录一齐在放置HTTP server服务器上才可查看效果）。

![3](./assets/3.png)



### 1.2. 简单了解大致配置信息

#### 1.2.1. package.json

1. **简介**

   通常是用npm init/vue init 创建一个npm项目时，会自动生成一个package.json文件。package.json文件会描述这个NPM包的所有相关信息，包括作者、简介、包依赖、构建等信息。

2. **关于package.json的相关属性**

| 属性名          | 说明/作用                                                    |
| --------------- | ------------------------------------------------------------ |
| name            | 包/项目名                                                    |
| version         | 版本                                                         |
| description     | 包/项目描述                                                  |
| author          | 作者                                                         |
| license         | 许可                                                         |
| private         | [私有包/项目](https://blog.csdn.net/guolinengineer/article/details/84334914) |
| scripts         | 指定了运行脚本命令的npm命令行缩写。如 npm run dev、npm run build等 |
| dependencies    | 生产环境依赖包列表。它们将会被安装在 node_module 目录下      |
| devDependencies | 开发环境依赖包列表。它们将会被安装在 node_module 目录下      |
| browserslist    | [代表这个项目的浏览器兼容情况](https://www.jianshu.com/p/bd9cb7861b85) |

#### 1.2.2. webpack.config.js

1. **简介**

   webpack在对象执行打包构建的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。默认会搜索当前目录下webpack.config.js。

   因此我们可以通过将配置项信息在配置文件中定义，本项目中的webpack.config.js的功能则在于此。

   根据以下代码所示，我们可知道，webpack.config.js是一个node.js 模块，返回一个 json 格式的配置信息对象。

   ```js
   /** webpack.config.js **/
   var path = require('path')
   var webpack = require('webpack')
   
   module.exports = {
     entry: './src/main.js',
     output: {
       path: path.resolve(__dirname, './dist'),
       publicPath: '/dist/',
       filename: 'build.js'
     },
       ...
   }
   ```


2. **具体配置项信息**

- **entry - 入口文件**

  ```js
  {
      //方式1. 单入口 
      entry: './src/main.js',
      //方式2. 单入口
      entry: path.resolve(__dirname,'./src/main.js'),
  	//方式3. 单/多入口
      entry: ['./main.js', 'header.js'],
      //方式4. 单/多入口
      entry: {
      	'a': './main.js',
          ....    
      },
      //方式5. 单/多入口
      entry: () => new Promise((resolve)=>resolve(['./main.js','./header.js'])) 
  }
  ```

  入口是Webpack打包的起始文件，会顺着起始文件逐步构建依赖。

  

- **output - 打包出口文件**

  ```js
  {
  	output: {
          // node.js中__dirname变量获取当前模块文件所在目录的完整绝对路径 
          // path 所有输出文件的目标路径
          path: path.resolve(__dirname, './dist'),
          // publicPath输出解析文件的目录    
          publicPath: '/dist/',
          // 对应entry里面生成出来的文件名
          filename: 'build.js'
        },
  }
  ```



- **module - 设置对相应的模块使用相应的处理**

  ```js
  {
      module: {
          rules: [
            {
              // 正则表达式匹配 .css结尾的模块文件
              test: /\.css$/,
              // 使用指定的加载器处理对该模块进行处理
              use: [
                'vue-style-loader',
                'css-loader'
              ],
            },
             ...
          ]
      }
  }
  ```

- **resolve - 补全文件后缀**

  ```js
  {
      resolve: {
          
          alias: {
            'vue$': 'vue/dist/vue.esm.js'
          },
          extensions: ['*', '.js', '.vue', '.json']
      },
  }
  ```

  配置resolve 的 extensions 可以带来的方便是不需要指定加载的文件后缀，比如要加载一个js文件时，只要require(‘common’)就可以加载common.js文件了，例如：

  ```js
  import Hello from '@components/Hello';
  // 即Hello.vue这个组件我们不需要添加.vue后缀就可以引用到了，如果不用extensions，我们就必须要用@components/Hello.vue来引入这个文件。
  ```

  配置resolve 的 alias  带来的方便是 使 不同路径下的组件相互调用变得更加简单，比如：

  ```js
  // 假如在目录src/hello/world/ 下的组件要调用 src/components下的组件comp1，需要这么写。
  import Comp1 from '../../components/comp1';
  // 路径相对于当前页面进行引用，但是如果嵌套等更为复杂，那么写起来会比较麻烦。
  // 若配置了一下信息：
  alias: {
            '@': 'src/components'
          },
  // 那么导入只需要这么写
  import Comp1 from '@/comp1';
  ```

- **devServer - 对webpack-dev-server进行配置**

  ```js
  {
      devServer: {
          historyApiFallback: true,
          noInfo: true,
          overlay: true
          //...
      },
  }
  ```

  webpack-dev-server是一个用来快速搭建本地运行环境的工具，命令简单**webpack-dev-server**或配置命令脚本快捷运行。

  ```bash
  # 前面我们通过运行脚本 npm run dev 实质上是运行了webpack-dev-server命令
  npm run dev 
  
  # 打开package.json, 可在scripts配置项中看到，实际是运行这一条命令
  cross-env NODE_ENV=development webpack-dev-server --open --hot
  # 我们可看到，该条命令传入了2个参数， 没有指明 webpack.config.js配置文件，那么它默认在当前目录下查看webpack.config.js
  ```

  webpack-dev-server主要的作用是用来 模拟服务器运行情况，进行上线前调试等。

  <a href="#关于webpack-dev-server">关于webpack-dev-server的参数设置详细，点击此处查看</a>

- **performance -  配置如何展示性能提示**

  ```js
  {
      performance: {
          // 不显示性能提示
          hints: false
      }
  }
  ```

- **devtool - 指定sourceMap模式**

  ```js
  {
        devtool: '#eval-source-map'
  }
  ```

  根据官方回答，*Choose a developer tool to enhance debugging.* 即选择一种调试代码的方式。可参考[官方文档](https://www.webpackjs.com/configuration/devtool/)。

- **关于生产环境打包脚本**

  在配置文件末尾可看到，存在这么一段脚本，该段脚本的功能是当webpack执行打包属于生产环境下的，那么就新增和修改一些配置项。

  ```js
  // 判断命令行传递的参数是否指定生产环境打包
  if (process.env.NODE_ENV === 'production') {
    // 跟换devtool
    module.exports.devtool = '#source-map'
    // 新增plugins插件配置项，后续说明
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ])
  }
  ```

  我们通过打开package.json在看scripts配置项可知：

  ```bash
  # 项目生产环境打包命令
  npm run build
  # 实质上是运行了这条命令 
  # --hide-modules 隐藏有关模块的打包信息
  # --progress 显示打包进程
  cross-env NODE_ENV=production webpack --progress --hide-modules
  ```

  其中，**cross-env NODE_ENV=production ** 指定了 环境变量NODE_ENV = production，声明此次执行属于生产环境。



## 2. 修改模版

### 2.1. 整改webpack配置文件

我们可以看到，webpack-simple的所有wepack配置项都放在webpack.config.js中，显然，在小项目中是可行的，但是转移到一个拥有繁多的开发环境配置项、生产环境配置项的庞大的项目上，则需要明确划分好webpack配置文件。

#### 2.1.1. 整改准备

- 在项目根目录下新建目录build，及config
- 在config目录下创建文件index.js
- 在build目录下创建文件webpack.dev.conf.js、webpack.prod.conf.js、webpack.base.js

> -- config						#存放配置项变量
>
>  |-- index.js						##定义主要配置变量文件
>
> -- build						#引用config中的配置项变量和定义基本配置项
>
>  |-- webpack.base.js				##定义生产环境和开发环境共同需要的配置项
>
>  |-- webpack.dev.conf.js			##定义开发环境所需要的配置项信息
>
>  |-- webpack.prod.conf.js			##定义生产环境所需要的配置项信息

![4](./assets/4.png)

#### 2.1.2. 拆分webpack.config.js

```bash
# 后面拆分webpack配置文件，通过使用webpack-merge进行拼接多个子配置配置文件
npm install webpack-merge@4.1.0 --save-dev
```



#### 2.1.3. 配置config/index.js

```js
/** index.js **/

'use strict'
const path = require('path')

module.exports = {
  /* 通用配置项 */
    // 项目路径
  context: path.resolve(__dirname, '../'), 
  entry: './src/main.js',
  filename: 'build.js',

  // 开发环境配置变量
  dev: {
    /* devServer 配置项参数 */
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    noInfo: true,
    overlay: true,

  },
  // 生产环境配置变量
  build: {
    /* 打包路径 */
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    devtool: '#source-map',
  }
}
```

#### 2.1.4. 配置build/webpack.base.conf.js

```js
/** webpack.base.conf.js **/
/**
 *  定义通用配置项的配置文件
 */
'use strict'
const config = require('../config')
const path = require('path')

module.exports = {
  context: config.context,
  entry: {
    app: config.entry,
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: config.filename,
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname,'../src'),
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      ...
    ]
  },
  plugins:[],
  performance: {
    hints: false
  },
}
```

#### 2.1.5. 配置build/webpack.dev.conf.js

```js
/** webpack.dev.conf.js **/
/**
 *  开发环境下的所有配置项集中在此文件中
 */
'use strict'
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')

// 将开发环境特有的配置项和通用配置项合并
const devWebpackConfig = merge(baseWebpackConfig, {
  devServer: {
    host: config.dev.host,
    port: config.dev.port,
    historyApiFallback: config.dev.historyApiFallback,
    noInfo: config.dev.noInfo,
    overlay: config.dev.overlay,
  },
  devtool: '#eval-source-map',
  plugins: baseWebpackConfig.plugins
})

module.exports = devWebpackConfig
```

#### 2.1.6. 配置build/webpack.prod.conf.js

```js
/** webpack.prod.conf.js **/

/**
 *  生产环境下的所有配置项集中在此文件中
 */
'use strict'
var webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')

// 将生产环境特有的配置项和通用配置项合并
const webpackConfig = merge(baseWebpackConfig, {
  devtool: '#source-map',
  plugins: (baseWebpackConfig.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]) 
})

module.exports = webpackConfig
```

#### 2.1.7. 更改package.json

引用指定的配置文件。

```json
"scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.dev.conf.js --open --hot",
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.prod.conf.js --progress --hide-modules"
  }
```



#### 2.1.8. 测试

到这里，配置文件的拆分基本完成，同样的，输入命令测试开发环境配置和生产环境配置。 同时项目根目录下的webpack.config.js已经完全被我们划分的配置文件取代了，可将其删除。

```bash
npm run dev
npm run build
```



## 关于webpack-dev-server

更新中...