
import { ExtensionContext, workspace } from 'vscode';
import { Terminal } from "./terminal";
import { Process } from "./process";
import { Project } from "./project";

export function activate(context: ExtensionContext) {
	new Terminal(context);
	new Process(context);
	new Project(context);
}

export function deactivate() { }
