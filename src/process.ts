import { ExtensionContext, commands, window, workspace } from "vscode";
import { execCommand } from "./node";
import { outputLog } from './outputChannel';
import { IProcess } from "./interface";

const { registerCommand } = commands;
const { showInputBox } = window;
const { getConfiguration } = workspace;

interface IPort {
  pid: string;
  type: string;
}

export class Process implements IProcess {
  constructor(ctx: ExtensionContext) {
    let kill = registerCommand("xhonker.process.kill", () => this.killProcess());
    let portToPid = registerCommand('xhonker.process.killNode', () => this.killPort());
    ctx.subscriptions.push(kill);
    ctx.subscriptions.push(portToPid);
  }
  private async killProcess() {
    let result = await showInputBox({ placeHolder: "enter the pid" });
    if (!result) { return; }
    execCommand(`kill -9 ${result!}`);
  }
  async killPort() {
    let result = await showInputBox({ placeHolder: "enter the port" });
    if (!result) { return; }
    execCommand(`lsof -i:${result}`, (err: any, stdout: string) => {
      if (err) {
        outputLog('port is notfind');
        return;
      }
      const PID_INDEX = 10;
      const COMMAND_INDEX = 9;
      let commandResultTexts = stdout.split(/\s+/);
      let ports: Array<IPort> = [];
      while (commandResultTexts.length > PID_INDEX) {
        let type = commandResultTexts[COMMAND_INDEX];
        let pid = commandResultTexts[PID_INDEX];
        ports.push({ type, pid });
        commandResultTexts.splice(0, PID_INDEX);
      }
      if (!ports.length) { return; }

      const config = getConfiguration('xhonker');
      
      let killType = config.get('killType');
      let killCommand = config.get('killCommand');
      ports.forEach(({ pid, type }) => {
        if (type === killType) {
          execCommand(`${killCommand} ${pid}`);
        }
      });
    });
  }
}