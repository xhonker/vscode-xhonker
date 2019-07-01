import { window, ExtensionContext, commands } from "vscode";
const { createTerminal, activeTerminal, showInputBox } = window;
const { registerCommand } = commands;
export class Terminal {
  _terminal = activeTerminal || createTerminal();
  constructor(context: ExtensionContext) {
    let terminal = registerCommand('xhonker.terminal', () => this.input());
    context.subscriptions.push(terminal);
  }
  async input() {
    let word = await showInputBox();
    this.sendCommand(word!);
  }
  private sendCommand(word: string) {
    if (!word) { return; }
    this._terminal.show();
    this._terminal.sendText(word);
  }
}
