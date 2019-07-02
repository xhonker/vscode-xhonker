import { window, commands, workspace, ExtensionContext } from "vscode";
import { IProject } from "./interface";
import { sendCommand } from "./terminal";

const { showInputBox, showErrorMessage, showQuickPick } = window;
const { registerCommand } = commands;
const { getConfiguration } = workspace;

export class Project implements IProject {
  constructor(ctx: ExtensionContext) {
    let createPage = registerCommand('xhonker.project.create', () => this.createPage());
    ctx.subscriptions.push(createPage);
  }
  async createPage() {
    const config = getConfiguration('xhonker');

    let select = config.get<Array<string>>('pageType')!;
    let pageType = await showQuickPick(select);
    if (!pageType) {
      showErrorMessage("please enter the type");
      return;
    }

    let pageName = await showInputBox({ placeHolder: "enter the project name" });
    if (!pageName) {
      showErrorMessage("please enter the name");
      return;
    }

    let createCommand = config.get('createPage');
    sendCommand(`${createCommand} ${pageType} ${pageName}`);
    sendCommand(`yarn start ${pageName}`);
  }
}