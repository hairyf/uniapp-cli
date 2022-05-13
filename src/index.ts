#!/usr/bin/env node
import execa from 'execa'
import path from 'path'
import { devtoolPaths } from './config'
import { ensureJson } from './utils'
import { enquirerRunType, ensureDevtoolPath } from './utils/devtool'

const openDevtools = async () => {
  const { is, type, script } = await enquirerRunType()

  if (is('mp-weixin') && ['dev', 'build'].includes(type)) {
    const projectPath = path.join(process.cwd(), 'dist', type, 'mp-weixin')
    await Promise.all([
      ensureJson(path.join(projectPath, 'project.config.json'), {
        appid: 'touristappid',
        projectname: 'empty'
      }),
      ensureDevtoolPath('mp-weixin')
    ])
    execa.sync(`cli open --project ${projectPath} --color=always`, {
      cwd: devtoolPaths['mp-weixin']!,
      stdio: 'inherit'
    })
  }
  execa(`npm run ${script}`, { cwd: process.cwd(), stdio: 'inherit' })
}

async function cli() {
  try {
    await openDevtools()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

cli()
