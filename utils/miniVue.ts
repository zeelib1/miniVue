import { render } from "./render.js";
import { mount } from "./mount.js";
import { patch } from "./patch.js";
import { reactive, watchEffect } from "./reactive.js";
import { Component, State } from "../interfaces/miniVue";
import { VNode } from "../interfaces/vnode";

function handleIncrement(component: Component) {
  component.data.count += 1;
  component.data.clicked = !component.data.clicked;
}

function handleChangeMessage(component: Component) {
  component.data.msg = "Changed";
  component.data.clicked = !component.data.clicked;
}
const App: Component = {
  data: reactive<State>({
    count: 0,
    msg: "Hello, World!",
    clicked: false,
  }),
  renderFunction() {
    return render(
      1,
      "div",
      {
        class: this.data.clicked
          ? "button-component-1-clicked"
          : "button-component-1",
      },
      [],
      `Count: ${this.data.count}`,
      () => handleIncrement(this)
    );
  },
};

const App_2: Component = {
  data: reactive<State>({
    count: 0,
    msg: "Hello, World!",
    clicked: false,
  }),
  renderFunction() {
    return render(
      1,
      "div",
      {
        class: this.data.clicked
          ? "button-component-2-clicked"
          : "button-component-2",
      },
      [],
      `${this.data.msg}`,
      () => handleChangeMessage(this)
    );
  },
};

function mountApp(component: Component, container: HTMLElement) {
  let isMounted = false;
  let prevVNode: VNode | null = null;
  watchEffect(() => {
    if (!isMounted) {
      const nextVNode = component.renderFunction();
      mount({ vnode: nextVNode, container });
      prevVNode = nextVNode;
      isMounted = true;
    } else {
      const nextVNode = component.renderFunction();
      if (prevVNode) {
        patch({ oldVNode: prevVNode, newVNode: nextVNode });
      }
      prevVNode = nextVNode;
    }
  });
}

const appContainer = document.getElementById("app") as HTMLElement;

mountApp(App, appContainer);
mountApp(App_2, appContainer);
