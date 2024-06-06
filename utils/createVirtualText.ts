// src/utils/createVirtualText.ts
import { VNode } from "../interfaces/VNode";

/**
 * Creates a virtual DOM text node.
 * @param {string} text - Text content of the node.
 * @returns {VNode} The created virtual text node.
 */
export function createVirtualText(text: string): VNode {
  return { type: "text", properties: {}, children: [], text };
}
