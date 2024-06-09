import { MountParams } from "../interfaces/mountParams.js";

export function mount({ vnode, container }: MountParams): void {
  if (!vnode || !vnode.tag) {
    console.error("Invalid vnode", vnode);
    return;
  }

  const el = document.createElement(vnode.tag);

  // Apply properties and event listeners
  for (const key in vnode.properties) {
    if (key.startsWith("on")) {
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, vnode.properties[key] as EventListener);
    } else {
      el.setAttribute(key, vnode.properties[key]);
    }
  }

  // Specifically add click event listener if provided
  if (vnode.onClick) {
    el.addEventListener("click", vnode.onClick);
  }

  // Append children or text
  if (vnode.text) {
    const textNode = document.createTextNode(vnode.text);
    el.appendChild(textNode);
  } else {
    vnode.children.forEach((child) => {
      if (child) {
        if (typeof child === "string") {
          el.appendChild(document.createTextNode(child));
        } else {
          mount({ vnode: child, container: el });
        }
      }
    });
  }

  container.appendChild(el);
  vnode.el = el;
}
