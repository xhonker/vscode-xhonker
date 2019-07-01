import { ExtensionContext } from "vscode";

export interface ICommand {
  init(ctx: ExtensionContext): void;
}

export interface IProcess {
  killPort(): void;
}