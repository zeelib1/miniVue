// src/interfaces/VNode.ts

/**
 * Represents a virtual DOM node in a UI framework.
 * @interface
 * @property {number} id - The unique identifier for the node.
 * @property {string} tag - The tag of the virtual node (e.g., 'div', 'span').
 * @property {Object} properties - An object containing properties for the node.
 * @property {Array<VNode|null>} children - An array of child VNodes.
 * @property {string} [text] - Optional text content for the node.
 * @property {(event: string, callback: () => void) => void} [customEventListener] - An optional custom event listener function.
 * @property {Element} [el] - Reference to the actual DOM element.
 */
export interface VNode {
  id: Number;
  tag: string;
  properties: { [key: string]: any };
  children: Array<VNode | null>;
  text?: string;
  customEventListener?: (event: string, callback: () => void) => void;
  el?: Element; // Reference to the actual DOM element
}
