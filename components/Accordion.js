import { el } from "./dom.js";

export function Accordion({ id, action, open, className, header, body }) {
  return el("div", { className }, [
    el(
      "button",
      {
        className: "accordion-header",
        attrs: {
          type: "button",
          "aria-expanded": String(open)
        },
        dataset: { action, id }
      },
      header
    ),
    open ? body : null
  ]);
}
