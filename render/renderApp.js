import { StageCard } from "../components/StageCard.js";
import { el } from "../components/dom.js";
import { normalizeFunnel } from "./normalizeFunnel.js";

export function renderApp(data, state) {
  const funnel = normalizeFunnel(data);

  return el("div", { className: "funnel-shell" }, [
    el("h2", { className: "sr-only", text: funnel.meta.screenReaderTitle }),
    el("div", { className: "eyebrow", text: funnel.meta.eyebrow }),
    el("h1", { className: "page-title", text: funnel.meta.title }),
    el("p", { className: "page-description", text: funnel.meta.description }),
    el(
      "section",
      { className: "stage-list", attrs: { "aria-label": "VSL funnel stages" } },
      funnel.stages.map((stage) =>
        StageCard({
          stage,
          automations: stage.automations,
          trees: funnel.treeMap,
          state
        })
      )
    ),
    el("div", { className: "footer-note", text: funnel.meta.footer })
  ]);
}
