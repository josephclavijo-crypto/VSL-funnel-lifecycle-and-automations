import { TreeNode } from "../components/TreeNode.js";
import { el } from "../components/dom.js";

export function renderTree(treeData, state) {
  return el(
    "div",
    { className: "tree" },
    treeData.rootNodes.map((node) => renderNode(node, state))
  );
}

export function renderNode(nodeData, state) {
  return TreeNode({ node: nodeData, state });
}
