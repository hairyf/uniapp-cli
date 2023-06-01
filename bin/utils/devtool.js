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
var devtool_exports = {};
__export(devtool_exports, {
  enquirerRunType: () => enquirerRunType,
  ensureDevtoolPath: () => ensureDevtoolPath
});
module.exports = __toCommonJS(devtool_exports);
var import_enquirer = require("enquirer");
var import_consola = __toESM(require("consola"));
var import_fs_extra = __toESM(require("fs-extra"));
var import_unconfig = require("unconfig");
var import_config = require("../config");
async function ensureDevtoolPath(type) {
  const name = { "mp-weixin": "\u5FAE\u4FE1\u5F00\u53D1\u8005\u5DE5\u5177" }[type];
  if (import_config.devtoolPaths[type])
    return void 0;
  const { path } = await (0, import_enquirer.prompt)({
    type: "input",
    name: "path",
    message: `\u8BF7\u8F93\u5165${name}\u7684\u7EDD\u5BF9\u8DEF\u5F84`
  });
  if (!import_fs_extra.default.existsSync(path)) {
    import_consola.default.error("\u8BE5\u8DEF\u5F84\u4E0D\u5B58\u5728!");
    return Promise.resolve();
  }
  import_config.devtoolPaths[type] = path;
}
async function enquirerRunType() {
  const { config: userConfig } = await (0, import_unconfig.loadConfig)({
    sources: {
      files: "ptsup.config",
      extensions: ["ts", "mts", "cts", "js", "mjs", "cjs", "json", ""]
    },
    merge: false
  });
  const script = userConfig.default || await new import_enquirer.AutoComplete({
    name: "type",
    message: "\u8BF7\u8F93\u5165\u8FD0\u884C\u7C7B\u578B",
    choices: Object.keys(import_config.packageJson.scripts).filter((v) => !["cli", "uniapp-cli-run"].includes(v)),
    limit: 10,
    initial: 2
  }).run();
  const is = (_type) => new RegExp(_type).test(script);
  const code = import_config.packageJson.scripts[script];
  const type = script.split(":")[0];
  return { is, type, code, script };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  enquirerRunType,
  ensureDevtoolPath
});
