import { el } from "./dom.js";

export function Chevron({ open = false, className = "" }) {
  return el("i", {
    className: `ti ti-chevron-right chevron ${open ? "is-open" : ""} ${className}`.trim(),
    attrs: { "aria-hidden": "true" }
  });
}
