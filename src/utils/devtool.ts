import { AutoComplete, prompt } from 'enquirer'
import consola from 'consola'
import fs from 'fs-extra'
import { loadConfig } from 'unconfig'
import { devtoolPaths, packageJson } from '../config'
import type { DevtoolPaths, UserConfig } from '../config'

export async function ensureDevtoolPath(type: keyof DevtoolPaths) {
  const name = { 'mp-weixin': '微信开发者工具' }[type]
  if (devtoolPaths[type])
    return undefined
  const { path } = await prompt<{ path: string }>({
    type: 'input',
    name: 'path',
    message: `请输入${name}的绝对路径`,
  })
  if (!fs.existsSync(path)) {
    consola.error('该路径不存在!')
    return Promise.resolve()
  }
  devtoolPaths[type] = path
}

export async function enquirerRunType() {
  const { config: userConfig } = await loadConfig<UserConfig>({
    sources: {
      files: 'ptsup.config',
      extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
    },
    merge: false,
  })

  const script = userConfig.default || await new AutoComplete({
    name: 'type',
    message: '请输入运行类型',
    choices: Object.keys(packageJson.scripts).filter(v => !['cli', 'uniapp-cli-run'].includes(v)),
    limit: 10,
    initial: 2,
  } as any).run()

  const is = (_type: keyof DevtoolPaths) => new RegExp(_type).test(script)
  const code = packageJson.scripts[script]
  const type = script.split(':')[0] as 'dev' | 'serve' | 'build'
  return { is, type, code, script }
}
