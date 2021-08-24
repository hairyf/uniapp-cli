#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const utils_1 = require("./utils");
const devtool_1 = require("./utils/devtool");
const openDevtools = async () => {
    const { is, code, type, script } = await devtool_1.enquirerRunType();
    if (is('mp-weixin') && ['dev', 'build'].includes(type)) {
        const projectPath = path_1.default.join(process.cwd(), 'dist', type, 'mp-weixin');
        await Promise.all([
            utils_1.ensureJson(path_1.default.join(projectPath, 'project.config.json'), {
                appid: 'touristappid',
                projectname: 'empty'
            }),
            devtool_1.ensureDevtoolPath('mp-weixin')
        ]);
        execa_1.default(`cli open --project ${projectPath} --color=always`, {
            cwd: config_1.devtoolPaths['mp-weixin'],
            stdio: 'inherit'
        });
    }
    execa_1.default(`npm run ${script}`, { cwd: process.cwd(), stdio: 'inherit' });
};
async function cli() {
    try {
        await openDevtools();
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}
cli();
