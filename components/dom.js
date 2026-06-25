export function el(tagName, options = {}, children = []) {
  const node = document.createElement(tagName);
  const { className, text, attrs = {}, dataset = {} } = options;

  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;

  Object.entries(attrs).forEach(([name, value]) => {
    if (value !== undefined && value !== null) node.setAttribute(name, value);
  });

  Object.entries(dataset).forEach(([name, value]) => {
    if (value !== undefined && value !== null) node.dataset[name] = value;
  });

  node.append(...children.filter(Boolean));
  return node;
}
