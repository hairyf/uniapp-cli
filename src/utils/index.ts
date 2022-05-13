import fs from 'fs-extra'
import { parse } from 'path'
export const ensureJsonSync = (path: string, object: any = {}) => {
  if (!fs.existsSync(path)) {
    fs.ensureDirSync(parse(path).dir)
    fs.writeJSONSync(path, object)
  }
}

export const ensureJson = async (path: string, object: any = {}) => {
  if (!fs.existsSync(path)) {
    await fs.ensureDir(parse(path).dir)
    await fs.writeJSON(path, object)
  }
}
