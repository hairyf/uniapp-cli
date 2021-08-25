# uni 脚手架工具(uniapp-cli-run)

## 简述

用于 uni 脚手架启动小程序端时自动打开开发者工具，目前只支持微信小程序，如需支持其他小程序，请在 lssues 中提出建议。

## 使用指南

### 一、构建 uni 脚手架项目

- [通过 vue-cli 命令行](https://uniapp.dcloud.io/quickstart?id=_2-%e9%80%9a%e8%bf%87vue-cli%e5%91%bd%e4%bb%a4%e8%a1%8c)
- [当 uni-app 遇见 vscode](https://ask.dcloud.net.cn/article/36286)

### 二、项目中安装扩展插件

~~~makefile
# 当前项目安装, 也可全局安装
npm i uniapp-cli-run -D
~~~

### 三、开启开发者工具命令行

开发者工具的设置 -> 安全设置中开启服务端口。

### 四、项目中添加脚本并运行

~~~json
// package.json
{
  "scripts": {
    "cli": "uniapp-cli-run",
    "build:mp-weixin": "..."
  }
}
~~~

~~~makefile
npm run cli
~~~

![运行展示](https://github.com/TuiMao233/uniapp-cli-run/blob/master/meta/images/script.png?raw=true)

## 注意事项

- 未支持的小程序不会自动打开调试器，但也不会使该编译命令失效

