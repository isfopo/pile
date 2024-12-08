import * as vscode from "vscode";
import { PileTreeviewProvider } from "./PileTreeviewProvider";
import { LinkTreeItem } from "./classes/TreeItems/LinkTreeItem";

export function activate(context: vscode.ExtensionContext) {
  const treeDataProvider = new PileTreeviewProvider(context).register();

  vscode.commands.registerCommand(
    "pile.open",
    async (element: LinkTreeItem) => {
      treeDataProvider.open(element.url);
    }
  );

  vscode.commands.registerCommand("pile.refresh", () => {
    treeDataProvider.refresh();
  });

  vscode.commands.registerCommand("pile.reset", () => {
    treeDataProvider.reset();
    vscode.window.showInformationMessage("Pile reset");
    treeDataProvider.refresh();
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
