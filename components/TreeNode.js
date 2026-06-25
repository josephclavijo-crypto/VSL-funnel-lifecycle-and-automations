import { Accordion } from "./Accordion.js";
import { Chevron } from "./Chevron.js";
import { FieldTable } from "./FieldTable.js";
import { el } from "./dom.js";

const iconByType = {
  trigger: "TR",
  action: "A",
  condition: "IF"
};

export function TreeNode({ node, state }) {
  if (node.type === "end") return EndNode(node);
  if (node.layout === "gate") return GateNode({ node, state });
  return AtomicTreeNode({ node, state });
}

export function ConditionNode(props) {
  return AtomicTreeNode(props);
}

export function ActionNode(props) {
  return AtomicTreeNode(props);
}

function AtomicTreeNode({ node, state }) {
  const hasParams = Boolean(node.params?.length);
  const open = state.expandedTreeNodes.has(node.id);

  return Accordion({
    id: node.id,
    action: "toggle-tree-node",
    open,
    className: `tree-node tree-node--${node.type}`,
    header: [
      el("span", { className: `node-icon node-icon--${node.type}`, text: node.iconLabel || iconByType[node.type] }),
      el("span", { className: "node-copy" }, [
        el("span", { className: "node-title", text: node.title }),
        el("span", { className: "node-subtitle", text: node.subtitle })
      ]),
      hasParams ? Chevron({ open, className: "tree-chevron" }) : null
    ],
    body: hasParams
      ? el("div", { className: "tree-detail" }, [FieldTable({ rows: node.params, compact: true })])
      : null
  });
}

function GateNode({ node, state }) {
  return el("div", { className: "gate-node" }, [
    ConditionNode({ node: { ...node, layout: undefined, type: "condition" }, state }),
    ...node.branches.flatMap((branch) => [
      el("span", { className: `branch-label branch-label--${branch.tone}`, text: branch.label }),
      el(
        "div",
        { className: "branch-body" },
        branch.nodes.map((childNode) => TreeNode({ node: childNode, state }))
      )
    ])
  ]);
}

function EndNode(node) {
  return el("div", { className: "end-node" }, [
    el("span", { className: "end-dot" }),
    el("span", { text: `End — ${node.label}` })
  ]);
}
