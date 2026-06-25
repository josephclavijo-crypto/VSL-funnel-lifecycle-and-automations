import { Accordion } from "./Accordion.js";
import { Badge } from "./Badge.js";
import { Chevron } from "./Chevron.js";
import { SectionHeader } from "./SectionHeader.js";
import { renderTree } from "../render/renderTree.js";
import { el } from "./dom.js";

export function AutomationCard({ automation, tree, state }) {
  if (automation.status === "not-linked") {
    return el("div", { className: "automation-placeholder" }, [
      el("i", { className: "ti ti-git-branch branch-icon", attrs: { "aria-hidden": "true" } }),
      el("span", { text: automation.name }),
      Badge({ text: "not yet linked here", kind: "idle" })
    ]);
  }

  const open = state.expandedAutomations.has(automation.id);

  return Accordion({
    id: automation.id,
    action: "toggle-automation",
    open,
    className: "automation-card",
    header: [
      el("i", { className: "ti ti-git-branch branch-icon", attrs: { "aria-hidden": "true" } }),
      el("span", { className: "automation-title", text: automation.name }),
      Badge({ text: "mapped", kind: "mapped" }),
      Chevron({ open, className: "automation-chevron" })
    ],
    body: el("div", { className: "automation-detail" }, [
      SectionHeader("Purpose"),
      el("p", { className: "purpose-copy", text: automation.purpose }),
      SectionHeader("Simplified overview"),
      el("pre", { className: "ascii-block", text: automation.overview.join("\n") }),
      SectionHeader("Full branching tree"),
      renderTree(tree, state)
    ])
  });
}
