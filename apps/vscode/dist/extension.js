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
function getApiBaseUrl() {
  const config = vscode.workspace.getConfiguration("promptEnhancer");
  const customUrl = config.get("apiBaseUrl");
  if (customUrl && customUrl.trim()) {
    return customUrl.trim();
  }
  const envUrl = process.env.VSCODE_ENHANCER_API || process.env.NEXT_PUBLIC_SERVER_URL;
  if (envUrl && envUrl.trim()) {
    return envUrl.trim();
  }
  const productionUrl = config.get("productionApiUrl") || "https://prompt-enhancer.vercel.app";
  return productionUrl;
}
function getModelPreference() {
  const config = vscode.workspace.getConfiguration("promptEnhancer");
  return config.get("model") || void 0;
}
async function enhance(prompt, model) {
  const baseUrl = getApiBaseUrl();
  const modelPref = model || getModelPreference();
  const res = await fetch(`${baseUrl}/api/enhance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, model: modelPref })
  });
  if (!res.ok) throw new Error(await res.text());
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
    const loadingMessage = vscode.window.setStatusBarMessage("$(loading~spin) Enhancing selection...");
    const enhanced = await enhance(selection);
    loadingMessage.dispose();
    const originalText = selection;
    const selectionRange = editor.selection.isEmpty ? new vscode.Range(editor.document.positionAt(0), editor.document.positionAt(editor.document.getText().length)) : editor.selection;
    await editor.edit((builder) => {
      builder.replace(selectionRange, enhanced);
    });
    const addedDecoration = vscode.window.createTextEditorDecorationType({
      backgroundColor: new vscode.ThemeColor("diffEditor.insertedTextBackground"),
      border: "1px solid rgba(76, 175, 80, 0.3)",
      borderRadius: "2px"
    });
    const removedDecoration = vscode.window.createTextEditorDecorationType({
      backgroundColor: new vscode.ThemeColor("diffEditor.removedTextBackground"),
      border: "1px solid rgba(244, 67, 54, 0.3)",
      borderRadius: "2px",
      textDecoration: "line-through"
    });
    const enhancedRange = new vscode.Range(selectionRange.start, editor.document.positionAt(editor.document.offsetAt(selectionRange.start) + enhanced.length));
    editor.setDecorations(addedDecoration, [enhancedRange]);
    const action = await vscode.window.showInformationMessage(
      "\u2728 AI Enhancement applied!",
      {
        modal: false,
        detail: `Original: ${originalText.length} chars \u2192 Enhanced: ${enhanced.length} chars`
      },
      "Keep Enhancement",
      "Revert to Original"
    );
    addedDecoration.dispose();
    removedDecoration.dispose();
    if (action === "Revert to Original") {
      await editor.edit((builder) => {
        builder.replace(enhancedRange, originalText);
      });
      vscode.window.setStatusBarMessage("$(close) Reverted to original", 3e3);
    } else {
      vscode.window.setStatusBarMessage("$(check) Enhancement kept", 3e3);
    }
  } catch (err) {
    vscode.window.showErrorMessage(`Enhance failed: ${err?.message ?? err}`);
  }
}
function activate(context) {
  const enhanceDisposable = vscode.commands.registerCommand("promptEnhancer.enhanceSelection", runEnhanceCommand);
  context.subscriptions.push(enhanceDisposable);
  const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  status.text = "$(sparkle)";
  status.command = "promptEnhancer.enhanceSelection";
  status.tooltip = "Enhance Selection with AI";
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
