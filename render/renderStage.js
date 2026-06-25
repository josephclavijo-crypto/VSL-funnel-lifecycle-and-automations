import { StageCard } from "../components/StageCard.js";

export function renderStage(stageData, dependencies) {
  return StageCard({
    stage: stageData,
    automations: dependencies.automations,
    trees: dependencies.trees,
    state: dependencies.state
  });
}
