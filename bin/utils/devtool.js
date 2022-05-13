"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enquirerRunType = exports.ensureDevtoolPath = void 0;
const config_1 = require("../config");
const enquirer_1 = require("enquirer");
const consola_1 = __importDefault(require("consola"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const ensureDevtoolPath = async (type) => {
    const name = { 'mp-weixin': '微信开发者工具' }[type];
    if (config_1.devtoolPaths[type])
        return undefined;
    const { path } = await enquirer_1.prompt({
        type: 'input',
        name: 'path',
        message: `请输入${name}的绝对路径`
    });
    if (!fs_extra_1.default.existsSync(path)) {
        consola_1.default.error('该路径不存在!');
        return Promise.resolve();
    }
    config_1.devtoolPaths[type] = path;
};
exports.ensureDevtoolPath = ensureDevtoolPath;
const enquirerRunType = async () => {
    const script = await new enquirer_1.AutoComplete({
        name: 'type',
        message: '请输入运行类型',
        choices: Object.keys(config_1.packageJson.scripts).filter((v) => !['cli', 'uniapp-cli-run'].includes(v)),
        limit: 10,
        initial: 2
    }).run();
    const is = (_type) => new RegExp(_type).test(script);
    const code = config_1.packageJson.scripts[script];
    const type = script.split(':')[0];
    return { is, type, code, script };
};
exports.enquirerRunType = enquirerRunType;
