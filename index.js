#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const shell = require('shelljs')
const program = require('commander')
const utils = require(path.resolve(__dirname, './src/utils'))

program
  .option('-m, --minimize')
  .parse(process.argv)

// 运行项目路径读取
const PRESET_PATH = path.resolve(__dirname, '../../')
const PACKAGE_PATH = path.resolve(PRESET_PATH, './package.json')

// 当前运行环境变量与运行命令
const NODE_ENV = process.env.NODE_ENV
const UNI_PLATFORM = process.env.UNI_PLATFORM
const EXEC_CODE = utils.getRunPresetExec(NODE_ENV, UNI_PLATFORM, program.minimize)

// 微信项目源码路径
const EXEC_CODE_TYPE = NODE_ENV === 'development' ? 'dev' : 'build'
const WEIXIN_PRESET_PATH = path.resolve(PRESET_PATH, `dist/${EXEC_CODE_TYPE}/mp-weixin`)

// 获取开发者工具目录
const PACKAGE_CONFIG = JSON.parse(fs.readFileSync(PACKAGE_PATH).toString())
const DEVTOOLS_CONFIG = PACKAGE_CONFIG.devtoolsConfig || {}
const WEIXIN_DEVTOOLS_PATH = DEVTOOLS_CONFIG.weixin


// 打开微信开发者调试工具, 并运行编译微信小程序
const openWeixinDevTools = () => {
  // 当调试器路径为空时, 给予提示并直接运行程序
  if (!WEIXIN_DEVTOOLS_PATH) {
    shell.echo('当前调试器路径为空, 自动打开调试器功能将失效')
    setTimeout(() => {
      shell.cd(PRESET_PATH)
      shell.exec(EXEC_CODE)
    }, 500)
    return false
  }
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
  return false
}

shell.cd(PRESET_PATH)
shell.exec(EXEC_CODE)