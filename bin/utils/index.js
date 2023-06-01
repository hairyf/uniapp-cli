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
var utils_exports = {};
__export(utils_exports, {
  ensureJson: () => ensureJson,
  ensureJsonSync: () => ensureJsonSync
});
module.exports = __toCommonJS(utils_exports);
var import_node_path = require("node:path");
var import_fs_extra = __toESM(require("fs-extra"));
function ensureJsonSync(path, object = {}) {
  if (!import_fs_extra.default.existsSync(path)) {
    import_fs_extra.default.ensureDirSync((0, import_node_path.parse)(path).dir);
    import_fs_extra.default.writeJSONSync(path, object);
  }
}
async function ensureJson(path, object = {}) {
  if (!import_fs_extra.default.existsSync(path)) {
    await import_fs_extra.default.ensureDir((0, import_node_path.parse)(path).dir);
    await import_fs_extra.default.writeJSON(path, object);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ensureJson,
  ensureJsonSync
});
