"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureJson = exports.ensureJsonSync = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const ensureJsonSync = (path, object = {}) => {
    if (!fs_extra_1.default.existsSync(path)) {
        fs_extra_1.default.ensureDirSync(path_1.parse(path).dir);
        fs_extra_1.default.writeJSONSync(path, object);
    }
};
exports.ensureJsonSync = ensureJsonSync;
const ensureJson = async (path, object = {}) => {
    if (!fs_extra_1.default.existsSync(path)) {
        await fs_extra_1.default.ensureDir(path_1.parse(path).dir);
        await fs_extra_1.default.writeJSON(path, object);
    }
};
exports.ensureJson = ensureJson;
