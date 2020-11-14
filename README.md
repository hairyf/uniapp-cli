# uni 脚手架工具 open-devtools

## open-devtools 简述

用于 uni 脚手架启动小程序端时自动打开开发者工具，目前只支持微信小程序，后续将进行支持其他小程序。

## open-devtools 使用指南

### 一、构建 uni 脚手架项目

具体参考 dcloud 官网介绍：[通过 vue-cli 命令行](https://uniapp.dcloud.io/quickstart?id=_2-%e9%80%9a%e8%bf%87vue-cli%e5%91%bd%e4%bb%a4%e8%a1%8c)，[当 uni-app 遇见 vscode](https://ask.dcloud.net.cn/article/36286)

### 二、项目中安装扩展插件

~~~makefile
npm i open-devtools -D
~~~

### 二、替换 package.json 命令

将 scripts 中所有命令中 `vue-cli-service uni-build` 或者是  `vue-cli-service uni-build --watch` 的命令替换为 `open-devtools`，例如以下实例

~~~json
{
    "scripts": {
        "dev:mp-weixin": "cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin open-devtools",
        "build:mp-weixin": "cross-env NODE_ENV=production UNI_PLATFORM=mp-weixin open-devtools",
        "...": "..."
    }
}
~~~

### 三、package.json 中对应调试器路径

这里需要注意，该路径需要绝对路径，路径分割符号`\`得进行转移`\\`

~~~json
{
    "devtoolsConfig": {
    	"weixin": "F:\\softs\\微信web开发者工具",
       "...": "..."
  	}
}
~~~

### 三、运行项目

~~~makefile
npm run dev:mp-weixin
~~~

## 注意事项

- 未支持的小程序不会自动打开调试器，但也不会使该编译命令失效
- 将所有命令都替换为 `cross-env ... open-devtools` 以便后期兼容后，直接更新即可使用
- 安装插件后，想要自动打开调试器，`package.json` 中的 `devtoolsConfig` 为必选项

