import * as vscode from "vscode";
import { Logger } from "./services/Logger";
export class PileTreeviewProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  readonly context: vscode.ExtensionContext;

  private _onDidChangeTreeData: vscode.EventEmitter<
    vscode.TreeItem | undefined | void
  > = new vscode.EventEmitter<vscode.TreeItem | undefined | void>();

  readonly onDidChangeTreeData: vscode.Event<
    vscode.TreeItem | undefined | void
  > = this._onDidChangeTreeData.event;

  readonly logger: Logger;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.logger = Logger.getInstance(context);
  }

  register() {
    try {
      const trees = [
        vscode.window.createTreeView("pile-sidebar", {
          treeDataProvider: this,
        }),

        vscode.window.createTreeView("pile-explorer", {
          treeDataProvider: this,
        }),
      ];

      for (const tree of trees) {
        tree.onDidChangeSelection(async (e): Promise<void> => {
          this.refresh();
        });
      }

      return this;
    } catch (e) {
      this.logger.log(e as string);
      return this;
    }
  }

  async add(
    element: vscode.TreeItem,
    newTask: string,
    {
      onError,
    }: {
      onError?: (message: string) => void;
    } = {}
  ): Promise<void> {
    if (!element) {
      onError?.("Element is undefined");
      return;
    }

    this.refresh();
  }

  async edit(element: vscode.TreeItem, update: string): Promise<void> {
    this.refresh();
  }

  refresh(): void {
    try {
      this._onDidChangeTreeData?.fire();
    } catch (e) {
      this.logger.log(e as string);
    }
  }

  getTreeItem(
    element: vscode.TreeItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(
    element?: vscode.TreeItem | undefined
  ): vscode.ProviderResult<vscode.TreeItem[]> {
    if (element === undefined) {
    } else {
      return;
    }
  }

  reset() {
    this.refresh();
  }
}
