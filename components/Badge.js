import { el } from "./dom.js";

export function Badge({ text, kind = "idle" }) {
  return el("span", {
    className: `pill pill--${kind}`,
    text
  });
}
