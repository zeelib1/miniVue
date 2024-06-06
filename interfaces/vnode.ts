// src/interfaces/VNode.ts

/**
 * Represents a virtual DOM node in a UI framework.
 * @interface
 * @property {string} type - The type of the virtual node (e.g., 'div', 'span').
 * @property {Object} properties - An object containing properties for the node.
 * @property {Array<VNode|null>} children - An array of child VNodes.
 * @property {string} [text] - Optional text content for the node.
 * @property {(event: string, callback: () => void) => void} [customEventListener] - An optional custom event listener function.
 */
export interface VNode {
  type: string;
  properties: { [key: string]: any };
  children: Array<VNode | null>;
  text?: string;
  customEventListener?: (event: string, callback: () => void) => void;
}
