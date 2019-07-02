import { window, ExtensionContext, commands } from "vscode";
const { createTerminal, activeTerminal, showInputBox } = window;
const { registerCommand } = commands;
export class Terminal {
  constructor(context: ExtensionContext) {
    let terminal = registerCommand('xhonker.terminal', () => this.input());
    context.subscriptions.push(terminal);
  }
  async input() {
    let word = await showInputBox();
    if (!word) { return; }
    sendCommand(word);
  }
}

export const sendCommand = (word: string) => {
  if (!word) { return; }
  let terminal = activeTerminal || createTerminal();
  terminal.show();
  terminal.sendText(word);
};