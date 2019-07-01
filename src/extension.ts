
import { ExtensionContext, commands } from 'vscode';
import { Terminal } from "./terminal";
import { Process } from "./process";

let { registerCommand } = commands;

export function activate(context: ExtensionContext) {
	let terminal = new Terminal(context);
	let process = new Process();
	process.init(context);
}

export function deactivate() { }
