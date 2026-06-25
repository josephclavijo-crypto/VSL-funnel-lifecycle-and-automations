import { AutomationCard } from "../components/AutomationCard.js";

export function renderAutomation(automationData, dependencies) {
  return AutomationCard({
    automation: automationData,
    tree: dependencies.tree,
    state: dependencies.state
  });
}
