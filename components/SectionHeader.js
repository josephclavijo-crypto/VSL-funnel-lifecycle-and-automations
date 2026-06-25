import { el } from "./dom.js";

export function SectionHeader(text) {
  return el("p", {
    className: "section-label",
    text
  });
}
