import { ExtensionContext, commands, workspace, window } from "vscode";
import { exec } from "child_process";
import { outputLog } from "./outputChannel";

let { registerCommand } = commands;
let { rootPath } = workspace;
let { showInputBox } = window;


export const node = (context: ExtensionContext) => {
  context.subscriptions.push(registerCommand('xhonker.node.command', async () => {
    let input = await showInputBox();
    execCommand(input!);
  }));
};

type execFn = (err: any, stdout: any, stderr: any) => void;

export function execCommand(word: string, cb?: execFn) {
  if (!word) { return; }
  exec(word, { cwd: rootPath }, cb || execResult);
}

function execResult(err: any, stdout: string, stderr: any) {
  if (err) {
    outputLog(err);
    return;
  }
  outputLog('exec success');
  outputLog(stdout);
  outputLog(stderr);
}