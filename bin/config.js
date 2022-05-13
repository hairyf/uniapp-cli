"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devtoolNames = exports.packageJson = exports.devtoolPaths = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const process_1 = require("process");
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const RC_PATH = path_1.default.resolve(os_1.default.homedir(), '.uniapp-cli-runrc');
utils_1.ensureJsonSync(RC_PATH);
/** 所有开发者工具路径 */
exports.devtoolPaths = new Proxy(fs_extra_1.default.readJSONSync(RC_PATH), {
    get(target, property) {
        return target[property];
    },
    set(target, property, value) {
        target[property] = value;
        fs_extra_1.default.writeJSONSync(RC_PATH, target);
        return true;
    }
});
/** 根项目包配置 */
exports.packageJson = fs_extra_1.default.readJSONSync(path_1.default.resolve(process_1.cwd(), 'package.json'));
/** 对应开发者工具名称 */
exports.devtoolNames = {
    'mp-weixin': '微信开发者工具'
};
