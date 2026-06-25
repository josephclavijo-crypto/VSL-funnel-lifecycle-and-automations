import { renderApp } from "./render/renderApp.js";

const state = {
  expandedStages: new Set(),
  expandedAutomations: new Set(),
  expandedTreeNodes: new Set()
};

const app = document.getElementById("app");
const data = await fetch("./data/funnel.json").then((response) => response.json());

function toggleSetValue(set, id) {
  if (set.has(id)) {
    set.delete(id);
    return;
  }
  set.add(id);
}

function update(action) {
  if (action.type === "toggle-stage") toggleSetValue(state.expandedStages, action.id);
  if (action.type === "toggle-automation") toggleSetValue(state.expandedAutomations, action.id);
  if (action.type === "toggle-tree-node") toggleSetValue(state.expandedTreeNodes, action.id);
  render();
}

function render() {
  app.replaceChildren(renderApp(data, state));
}

app.addEventListener("click", (event) => {
  const actionTarget = event
    .composedPath()
    .find((target) => target instanceof HTMLElement && target.dataset.action);

  if (!actionTarget) return;
  update({
    type: actionTarget.dataset.action,
    id: actionTarget.dataset.id
  });
});

render();
