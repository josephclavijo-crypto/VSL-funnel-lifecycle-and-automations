import { Accordion } from "./Accordion.js";
import { AutomationCard } from "./AutomationCard.js";
import { Badge } from "./Badge.js";
import { Chevron } from "./Chevron.js";
import { FieldTable } from "./FieldTable.js";
import { SectionHeader } from "./SectionHeader.js";
import { el } from "./dom.js";

export function StageCard({ stage, automations, trees, state }) {
  const open = state.expandedStages.has(stage.id);
  const isFlag = stage.kind === "flag";

  return Accordion({
    id: stage.id,
    action: "toggle-stage",
    open,
    className: "stage-card",
    header: [
      el("span", { className: isFlag ? "stage-num stage-num--flag" : "stage-num", text: stage.num }),
      el("span", { className: "stage-copy" }, [
        el("span", { className: "stage-title", text: stage.title }),
        el("span", { className: "stage-definition", text: stage.definition })
      ]),
      Badge({ text: isFlag ? "Open question" : "Confirmed", kind: isFlag ? "flag" : "confirmed" }),
      Chevron({ open, className: "stage-chevron" })
    ],
    body: el("div", { className: "stage-detail" }, [
      stage.fields.length ? SectionHeader("Fields updated") : null,
      stage.fields.length ? FieldTable({ rows: stage.fields }) : null,
      SectionHeader("Automations mapped"),
      automations.length
        ? el(
            "div",
            {},
            automations.map((automation) =>
              AutomationCard({
                automation,
                tree: automation.treeId ? trees.get(automation.treeId) : null,
                state
              })
            )
          )
        : el("p", { className: "empty-copy", text: "No automation mapped yet for this stage." })
    ])
  });
}
