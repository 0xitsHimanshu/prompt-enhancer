import * as vscode from "vscode";

async function enhance(prompt: string, model?: string): Promise<string> {
	const config = vscode.workspace.getConfiguration("promptEnhancer");
	const baseUrl = config.get<string>("apiBaseUrl") || process.env.VSCODE_ENHANCER_API || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
	const modelPref = model || config.get<string>("model") || undefined;
	const res = await fetch(`${baseUrl}/api/enhance`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ prompt, model: modelPref }),
	});
	if (!res.ok) {
		throw new Error(await res.text());
	}
	const data = (await res.json()) as { enhanced?: string };
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
		vscode.window.setStatusBarMessage("Enhancing selection...", 2000);
		const enhanced = await enhance(selection);
		editor.edit((builder) => {
			if (editor.selection.isEmpty) {
				const fullRange = new vscode.Range(
					editor.document.positionAt(0),
					editor.document.positionAt(editor.document.getText().length),
				);
				builder.replace(fullRange, enhanced);
			} else {
				builder.replace(editor.selection, enhanced);
			}
		});
		vscode.window.showInformationMessage("Enhanced selection");
	} catch (err: any) {
		vscode.window.showErrorMessage(`Enhance failed: ${err?.message ?? err}`);
	}
}

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand("promptEnhancer.enhanceSelection", runEnhanceCommand);
	context.subscriptions.push(disposable);

	const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	status.text = "$(sparkle) Enhance";
	status.command = "promptEnhancer.enhanceSelection";
	status.tooltip = "Enhance Selection";
	status.show();
	context.subscriptions.push(status);
}

export function deactivate() {}
