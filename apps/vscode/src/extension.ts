import * as vscode from "vscode";
import * as path from "path";

// Smart API base URL detection
function getApiBaseUrl(): string {
    const config = vscode.workspace.getConfiguration("promptEnhancer");
    
    // 1. Check if user has explicitly set a custom URL
    const customUrl = config.get<string>("apiBaseUrl");
    if (customUrl && customUrl.trim()) {
        return customUrl.trim();
    }
    
    // 2. Check environment variables (for development)
    const envUrl = process.env.VSCODE_ENHANCER_API || process.env.NEXT_PUBLIC_SERVER_URL;
    if (envUrl && envUrl.trim()) {
        return envUrl.trim();
    }
    
    // 3. Use production default
    const productionUrl = config.get<string>("productionApiUrl") || "https://prompt-enhancer.vercel.app";
    return productionUrl;
}

// Get model preference with fallback
function getModelPreference(): string | undefined {
    const config = vscode.workspace.getConfiguration("promptEnhancer");
    return config.get<string>("model") || undefined;
}

async function enhance(prompt: string, model?: string): Promise<string> {
    const baseUrl = getApiBaseUrl();
    const modelPref = model || getModelPreference();

    const res = await fetch(`${baseUrl}/api/enhance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: modelPref }),
    });

    if (!res.ok) throw new Error(await res.text());

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
        const loadingMessage = vscode.window.setStatusBarMessage("$(loading~spin) Enhancing selection...");

        const enhanced = await enhance(selection);

        loadingMessage.dispose();

        // Store original text and selection range for potential revert
        const originalText = selection;
        const selectionRange = editor.selection.isEmpty ? 
            new vscode.Range(editor.document.positionAt(0), editor.document.positionAt(editor.document.getText().length)) :
            editor.selection;

        // Replace with enhanced text immediately
        await editor.edit((builder) => {
            builder.replace(selectionRange, enhanced);
        });

        // Create diff-like decorations to show what changed
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

        // Apply decorations to show the enhancement
        const enhancedRange = new vscode.Range(selectionRange.start, editor.document.positionAt(editor.document.offsetAt(selectionRange.start) + enhanced.length));
        editor.setDecorations(addedDecoration, [enhancedRange]);

        // Show accept/reject options with a simple notification
        const action = await vscode.window.showInformationMessage(
            "✨ AI Enhancement applied!",
            {
                modal: false,
                detail: `Original: ${originalText.length} chars → Enhanced: ${enhanced.length} chars`
            },
            "Keep Enhancement",
            "Revert to Original"
        );

        // Clean up decorations
        addedDecoration.dispose();
        removedDecoration.dispose();

        if (action === "Revert to Original") {
            // Revert to original text
            await editor.edit((builder) => {
                builder.replace(enhancedRange, originalText);
            });
            vscode.window.setStatusBarMessage("$(close) Reverted to original", 3000);
        } else {
            // Keep the enhancement (already applied)
            vscode.window.setStatusBarMessage("$(check) Enhancement kept", 3000);
        }

    } catch (err: any) {
        vscode.window.showErrorMessage(`Enhance failed: ${err?.message ?? err}`);
    }
}

export function activate(context: vscode.ExtensionContext) {
    const enhanceDisposable = vscode.commands.registerCommand("promptEnhancer.enhanceSelection", runEnhanceCommand);
    context.subscriptions.push(enhanceDisposable);

    const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    status.text = "$(sparkle)";
    status.command = "promptEnhancer.enhanceSelection";
    status.tooltip = "Enhance Selection with AI";
    status.show();
    context.subscriptions.push(status);
}

export function deactivate() {}
