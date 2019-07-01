import { window } from "vscode";

let { createOutputChannel } = window;
let outputChannel = createOutputChannel("xhonker");

export const outputLog = (text: string) => {
  outputChannel.show();
  outputChannel.appendLine(text);
};