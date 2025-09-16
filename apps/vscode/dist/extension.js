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

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
async function enhance(prompt, model) {
  const config = vscode.workspace.getConfiguration("promptEnhancer");
  const baseUrl = config.get("apiBaseUrl") || process.env.VSCODE_ENHANCER_API || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
  const modelPref = model || config.get("model") || void 0;
  const res = await fetch(`${baseUrl}/api/enhance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, model: modelPref })
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  const data = await res.json();
  if (!data.enhanced) throw new Error("No enhanced text returned");
  return data.enhanced;
}
async function runEnhanceCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No active editor");
    return;
  }
  const selection = editor.document.getText(editor.selection) || editor.document.getText();
  if (!selection.trim()) {
    vscode.window.showWarningMessage("Nothing selected to enhance");
    return;
  }
  try {
    vscode.window.setStatusBarMessage("Enhancing selection...", 2e3);
    const enhanced = await enhance(selection);
    editor.edit((builder) => {
      if (editor.selection.isEmpty) {
        const fullRange = new vscode.Range(
          editor.document.positionAt(0),
          editor.document.positionAt(editor.document.getText().length)
        );
        builder.replace(fullRange, enhanced);
      } else {
        builder.replace(editor.selection, enhanced);
      }
    });
    vscode.window.showInformationMessage("Enhanced selection");
  } catch (err) {
    vscode.window.showErrorMessage(`Enhance failed: ${err?.message ?? err}`);
  }
}
function activate(context) {
  const disposable = vscode.commands.registerCommand("promptEnhancer.enhanceSelection", runEnhanceCommand);
  context.subscriptions.push(disposable);
  const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  status.text = "$(sparkle) Enhance";
  status.command = "promptEnhancer.enhanceSelection";
  status.tooltip = "Enhance Selection";
  status.show();
  context.subscriptions.push(status);
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
