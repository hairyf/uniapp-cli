import { devtoolPaths, DevtoolPaths, packageJson } from '../config'
import { prompt, AutoComplete } from 'enquirer'
import consola from 'consola'
import fs from 'fs-extra'

export const ensureDevtoolPath = async (type: keyof DevtoolPaths) => {
  const name = { 'mp-weixin': '微信开发者工具' }[type]
  if (!devtoolPaths[type]) {
    const { path } = await prompt<{ path: string }>({
      type: 'input',
      name: 'path',
      message: `请输入${name}的绝对路径`
    })
    if (!fs.existsSync(path)) {
      consola.error('该路径不存在!')
      return Promise.resolve()
    }
    devtoolPaths[type] = path
  }
}

export const enquirerRunType = async () => {
  const script = await new AutoComplete(<any>{
    name: 'type',
    message: '请输入运行类型',
    choices: Object.keys(packageJson.scripts).filter((v) => !['cli', 'uniapp-cli-run'].includes(v)),
    limit: 10,
    initial: 2
  }).run()
  const is = (_type: keyof DevtoolPaths) => new RegExp(_type).test(script)
  const code = packageJson.scripts[script]
  const type = script.split(':')[0] as 'dev' | 'serve' | 'build'
  return { is, type, code, script }
}
