import { parse } from 'node:path'
import fs from 'fs-extra'

export function ensureJsonSync(path: string, object: any = {}) {
  if (!fs.existsSync(path)) {
    fs.ensureDirSync(parse(path).dir)
    fs.writeJSONSync(path, object)
  }
}

export async function ensureJson(path: string, object: any = {}) {
  if (!fs.existsSync(path)) {
    await fs.ensureDir(parse(path).dir)
    await fs.writeJSON(path, object)
  }
}
