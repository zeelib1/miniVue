// src/utils/createVirtualElement.ts
import { VNode } from "../interfaces/VNode";

/**
 * Creates a virtual DOM element.
 * @param {string} type - The type of the element (e.g., 'div', 'span').
 * @param {Object} properties - Properties for the element.
 * @param {Array<VNode|null>} children - Child elements or nodes.
 * @param {string} [text] - Optional text content for the element.
 * @param {(event: string, callback: () => void) => void} [customEventListener] - Optional event listener for the element.
 * @returns {VNode} The created virtual DOM element.
 */
export function createVirtualElement(
  type: string,
  properties: { [key: string]: any },
  children: Array<VNode | null> = [], // Ensure that children is always defined as an array
  text?: string,
  customEventListener?: (event: string, callback: () => void) => void
): VNode {
  return { type, properties, children, text, customEventListener };
}
