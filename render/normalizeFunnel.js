export function normalizeFunnel(data) {
  const nodes = new Map(data.nodes.map((node) => [node.id, node]));
  const trees = new Map(
    data.trees.map((tree) => [
      tree.id,
      {
        ...tree,
        rootNodes: tree.rootNodeIds.map((nodeId) => hydrateNode(nodes.get(nodeId), nodes))
      }
    ])
  );
  const automations = new Map(data.automations.map((automation) => [automation.id, automation]));

  return {
    ...data,
    automationMap: automations,
    treeMap: trees,
    stages: data.stages.map((stage) => ({
      ...stage,
      automations: stage.automationIds.map((automationId) => automations.get(automationId))
    }))
  };
}

function hydrateNode(node, nodes) {
  if (!node.branches) return node;

  return {
    ...node,
    branches: node.branches.map((branch) => ({
      ...branch,
      nodes: branch.nodeIds.map((nodeId) => hydrateNode(nodes.get(nodeId), nodes))
    }))
  };
}
