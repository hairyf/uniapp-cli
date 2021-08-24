import fs from 'fs-extra'
import { cwd } from 'process'
import os from 'os'
import path from 'path'
import { ensureJsonSync } from './utils'

export interface DevtoolPaths {
  'mp-weixin'?: string
}
export interface PackgeJson {
  scripts: Record<string, string>
}

const RC_PATH = path.resolve(os.homedir(), '.uniapp-cli-runrc')

ensureJsonSync(RC_PATH)

/** 所有开发者工具路径 */
export const devtoolPaths = new Proxy<DevtoolPaths>(fs.readJSONSync(RC_PATH), {
  get(target, property) {
    return target[<keyof DevtoolPaths>property]
  },
  set(target, property, value) {
    target[<keyof DevtoolPaths>property] = value
    fs.writeJSONSync(RC_PATH, target)
    return true
  }
})

/** 根项目包配置 */
export const packageJson: PackgeJson = fs.readJSONSync(path.resolve(cwd(), 'package.json'))
