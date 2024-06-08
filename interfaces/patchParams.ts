import { VNode } from "./vnode";

// Interface to define the parameters for the patch function
export interface PatchParams {
  oldVNode: VNode;
  newVNode: VNode;
}
