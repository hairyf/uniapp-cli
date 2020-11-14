#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const shell = require('shelljs')
const utils = require(path.resolve(__dirname, './src/utils'))

// 运行项目路径读取
const PRESET_PATH = path.resolve(__dirname, '../../')
const PACKAGE_PATH = path.resolve(PRESET_PATH, './package.json')

// 当前运行环境变量与运行命令
const NODE_ENV = process.env.NODE_ENV
const UNI_PLATFORM = process.env.UNI_PLATFORM
const EXEC_CODE = utils.getRunPresetExec(NODE_ENV, UNI_PLATFORM)

// 微信项目源码路径
const WEIXIN_PRESET_PATH = path.resolve(PRESET_PATH, 'dist/dev/mp-weixin')

// 获取开发者工具目录
const DEVTOOLS_CONFIG = JSON.parse(fs.readFileSync(PACKAGE_PATH).toString()).devtoolsConfig || {}
const WEIXIN_DEVTOOLS_PATH = DEVTOOLS_CONFIG.weixin


// 打开微信开发者调试工具, 并运行编译微信小程序
const openWeixinDevTools = () => {
  // 先写入, 防止无内容导致调试工具报错
  utils.mkdirsSync(WEIXIN_PRESET_PATH)
  const writeFileStr = JSON.stringify({ appid: 'touristappid', projectname: 'open-devtools' }, null, "\t")
  fs.writeFileSync(path.resolve(WEIXIN_PRESET_PATH, './project.config.json'), writeFileStr, { flag: 'w' })
  // 打开小程序项目
  const openDevToolsShell = `cli open --project ${WEIXIN_PRESET_PATH} --color=always`
  shell.cd(WEIXIN_DEVTOOLS_PATH)
  // 打开完毕后, 运行编译工具
  shell.exec(openDevToolsShell, () => {
    shell.cd(PRESET_PATH)
    shell.exec(EXEC_CODE)
  })
}


if (UNI_PLATFORM === 'mp-weixin') {
  openWeixinDevTools()
  return false;
}

shell.cd(PRESET_PATH)
shell.exec(EXEC_CODE)