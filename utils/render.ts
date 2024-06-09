import { VNode } from "../interfaces/vnode";

// src/utils/render.ts

/**
 * Creates a virtual DOM element.
 * @param {Number} id - The unique identifier for the element.
 * @param {string} tag - The tag of the element (e.g., 'div', 'span').
 * @param {Object} properties - Properties for the element.
 * @param {Array<VNode|null>} children - Child elements or nodes.
 * @param {string} [text] - Optional text content for the element.
 * @param {(event: string, callback: () => void) => void} [onClick] - Optional event listener for the element.
 * @returns {VNode} The created virtual DOM element.
 */
// src/utils/render.ts

export function render(
  id: number,
  tag: string,
  properties: { [key: string]: any },
  children: Array<VNode | null> = [],
  text?: string,
  onClick?: (event: MouseEvent) => void
): VNode {
  // VNode structure adjusted to treat onClick separately if you wish:
  return { id, tag, properties, children, text, onClick };
}
