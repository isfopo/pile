import { TreeItem, TreeItemCollapsibleState } from "vscode";

export class LinkTreeItem extends TreeItem {
  url: string;

  constructor(url: string) {
    super(url);
    this.url = url;
    this.collapsibleState = TreeItemCollapsibleState.None;
  }
}
