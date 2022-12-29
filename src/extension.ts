// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const decorationStyle = vscode.window.createTextEditorDecorationType({
		color: "orangered",
		fontWeight: "900"
	});

	console.log('Congratulations, your extension "console-highlighter" is now active!');

	vscode.workspace.onDidChangeTextDocument(event => {
		const currentWindow = vscode.window.visibleTextEditors.filter(editor => editor.document.uri === event.document.uri)[0];
		highlightConsole(currentWindow);
	});

	function highlightConsole(editor: vscode.TextEditor) {
		const code = editor.document.getText();
		const regex = /(console\.log)/ig;
		const splitCode = code.split("\n");
		let decoration: vscode.DecorationOptions[] = [];

		splitCode.map((line, idx) => {

			const foundWord = [...line.matchAll(regex)];

			foundWord.map(matchedItem => {
				if (matchedItem?.index !== undefined) {
					const range = new vscode.Range(
						new vscode.Position(idx, matchedItem?.index),
						new vscode.Position(idx, matchedItem?.index + matchedItem[1].length)
					);
					const rangeObj = { range };
					decoration.push(rangeObj);
				}

			});
		});

		editor.setDecorations(decorationStyle, decoration);
	}

}
