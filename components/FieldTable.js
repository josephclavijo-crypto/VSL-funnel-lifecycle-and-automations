import { el } from "./dom.js";

export function FieldTable({ rows = [], compact = false }) {
  return el(
    "div",
    { className: compact ? "field-table field-table--compact" : "field-table" },
    rows.map((row) =>
      el("div", { className: "field-row" }, [
        el("span", { className: "field-label", text: row.label }),
        el("span", { className: "field-value", text: row.value })
      ])
    )
  );
}
