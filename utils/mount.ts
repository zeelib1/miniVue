import { MountParams } from "../interfaces/mountParams.js";

export function mount({ vnode, container }: MountParams): void {
  // Check if vnode is properly defined
  console.log("Vnode:", vnode);

  if (!vnode || !vnode.tag) {
    console.error("Invalid vnode", vnode);
    return; // Exit if vnode is not valid
  }

  const el = document.createElement(vnode.tag);

  // Apply properties
  for (const key in vnode.properties) {
    el.setAttribute(key, vnode.properties[key]);
  }

  // // Apply custom event listeners if any
  // vnode.customEventListener?.(el); // Assuming the listener takes the element as argument

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
          mount({ vnode: child, container: el }); // Recursively mount non-null children
        }
      }
    });
  }

  container.appendChild(el);
  vnode.el = el; // Store a reference to the DOM node
}
