import { cwd } from 'node:process'
import os from 'node:os'
import path from 'node:path'
import fs from 'fs-extra'
import { ensureJsonSync } from './utils'

export interface DevtoolPaths {
  'mp-weixin'?: string
}
export interface PackageJson {
  scripts: Record<string, string>
}

const rcPath = path.resolve(os.homedir(), '.uniapp-cli-runrc')

ensureJsonSync(rcPath)

/** 所有开发者工具路径 */
export const devtoolPaths = new Proxy<DevtoolPaths>(fs.readJSONSync(rcPath), {
  get(target, property) {
    return target[property as keyof DevtoolPaths]
  },
  set(target, property, value) {
    target[property as keyof DevtoolPaths] = value
    fs.writeJSONSync(rcPath, target)
    return true
  },
})

/** 根项目包配置 */
export const packageJson: PackageJson = fs.readJSONSync(path.resolve(cwd(), 'package.json'))

/** 对应开发者工具名称 */
export const devtoolNames: Record<string, string> = {
  'mp-weixin': '微信开发者工具',
}

export interface UserConfig {
  default?: string
}

export function defineConfig(config: UserConfig) {
  return config
}
