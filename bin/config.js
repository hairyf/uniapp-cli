"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var config_exports = {};
__export(config_exports, {
  defineConfig: () => defineConfig,
  devtoolNames: () => devtoolNames,
  devtoolPaths: () => devtoolPaths,
  packageJson: () => packageJson
});
module.exports = __toCommonJS(config_exports);
var import_node_process = require("node:process");
var import_node_os = __toESM(require("node:os"));
var import_node_path = __toESM(require("node:path"));
var import_fs_extra = __toESM(require("fs-extra"));
var import_utils = require("./utils");
const rcPath = import_node_path.default.resolve(import_node_os.default.homedir(), ".uniapp-cli-runrc");
(0, import_utils.ensureJsonSync)(rcPath);
const devtoolPaths = new Proxy(import_fs_extra.default.readJSONSync(rcPath), {
  get(target, property) {
    return target[property];
  },
  set(target, property, value) {
    target[property] = value;
    import_fs_extra.default.writeJSONSync(rcPath, target);
    return true;
  }
});
const packageJson = import_fs_extra.default.readJSONSync(import_node_path.default.resolve((0, import_node_process.cwd)(), "package.json"));
const devtoolNames = {
  "mp-weixin": "\u5FAE\u4FE1\u5F00\u53D1\u8005\u5DE5\u5177"
};
function defineConfig(config) {
  return config;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defineConfig,
  devtoolNames,
  devtoolPaths,
  packageJson
});
