import { VNode } from "./vnode";

export interface State {
  count: number;
  msg: string;
  clicked: boolean;
}
export interface Component {
  data: State;
  renderFunction(): VNode;
}
