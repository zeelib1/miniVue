import { VNode } from "./vnode";

// Interface to define the structure of the mount function parameters
export interface MountParams {
  vnode: VNode;
  container: Element;
}
