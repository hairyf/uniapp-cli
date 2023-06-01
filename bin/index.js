#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_node_path = __toESM(require("node:path"));
var import_execa = __toESM(require("execa"));
var import_config = require("./config");
var import_utils = require("./utils");
var import_devtool = require("./utils/devtool");
async function openDevtools() {
  const { is, type, script } = await (0, import_devtool.enquirerRunType)();
  if (is("mp-weixin") && ["dev", "build"].includes(type)) {
    const projectPath = import_node_path.default.join(process.cwd(), "dist", type, "mp-weixin");
    await Promise.all([
      (0, import_utils.ensureJson)(import_node_path.default.join(projectPath, "project.config.json"), {
        appid: "touristappid",
        projectname: "empty"
      }),
      (0, import_devtool.ensureDevtoolPath)("mp-weixin")
    ]);
    import_execa.default.sync(`cli open --project ${projectPath} --color=always`, {
      cwd: import_config.devtoolPaths["mp-weixin"],
      stdio: "inherit"
    });
  }
  (0, import_execa.default)(`npm run ${script}`, { cwd: process.cwd(), stdio: "inherit" });
}
async function cli() {
  try {
    await openDevtools();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
cli();
