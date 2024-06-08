import { PatchParams } from "../interfaces/patchParams";
import { mount } from "./mount.js";

export function patch({ oldVNode, newVNode }: PatchParams): void {
  console.log("Old VNode:", oldVNode);
  console.log("New VNode:", newVNode);

  // Replace the whole node if the tags are different
  if (oldVNode.tag !== newVNode.tag) {
    const newEl = document.createElement(newVNode.tag);
    for (const key in newVNode.properties) {
      newEl.setAttribute(key, newVNode.properties[key]);
    }

    if (typeof newVNode.children === "string") {
      const textNode = document.createTextNode(newVNode.children);
      newEl.appendChild(textNode);
    } else {
      newVNode.children.forEach((child) => {
        if (child !== null) {
          if (typeof child === "string") {
            newEl.appendChild(document.createTextNode(child));
          } else {
            mount({ vnode: child, container: newEl });
          }
        }
      });
    }

    oldVNode.el?.parentNode?.replaceChild(newEl, oldVNode.el);
    newVNode.el = newEl;
    return;
  }

  const el = oldVNode.el!;
  newVNode.el = el;

  // Handle properties
  for (const key in newVNode.properties) {
    const newValue = newVNode.properties[key];
    if (el.getAttribute(key) !== newValue) {
      el.setAttribute(key, newValue);
    }
  }
  for (const key in oldVNode.properties) {
    if (!(key in newVNode.properties)) {
      el.removeAttribute(key);
    }
  }

  // Handle text content
  if (typeof newVNode.text === "string" && oldVNode.text !== newVNode.text) {
    el.textContent = newVNode.text;
  } else {
    // Handle children
    const oldChildren = oldVNode.children || [];
    const newChildren = newVNode.children || [];

    if (
      oldChildren.length !== newChildren.length ||
      (typeof oldVNode.children === "string" &&
        typeof newVNode.children !== "string")
    ) {
      el.innerHTML = ""; // Clear existing children
      newChildren.forEach((child) => {
        if (child !== null) {
          // Ensure child is not null
          if (typeof child === "string") {
            el.appendChild(document.createTextNode(child));
          } else {
            mount({ vnode: child, container: el });
          }
        }
      });
    } else {
      const childLength = Math.max(oldChildren.length, newChildren.length);
      for (let i = 0; i < childLength; i++) {
        const oldChild = oldChildren[i];
        const newChild = newChildren[i];

        if (!oldChild && newChild) {
          if (newChild !== null) {
            // Ensure newChild is not null
            mount({ vnode: newChild, container: el });
          }
        } else if (oldChild && !newChild) {
          if (oldChild.el) {
            el.removeChild(oldChild.el);
          }
        } else if (oldChild && newChild) {
          if (newChild !== null) {
            // Ensure newChild is not null
            patch({ oldVNode: oldChild, newVNode: newChild });
          }
        }
      }
    }
  }
}
