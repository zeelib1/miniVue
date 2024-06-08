import { render } from "./utils/render.js";
import { mount } from "./utils/mount.js";
import { patch } from "./utils/patch.js";

// First timeout for creating virtual DOM elements
setTimeout(() => {
  console.log("CREATING VIRTUAL DOM");
  const vdom1 = render(
    1,
    "div",
    { class: "container-1" },
    [],
    "VDOM 1 Parent text"
  );
  const vdom2 = render(
    2,
    "div",
    { class: "container-2" },
    [],
    "VDOM 2 Parent text"
  );
  console.log(vdom1);
  console.log(vdom2);
  console.log("---------------------------------");

  // Second timeout for mounting virtual DOM elements
  setTimeout(() => {
    console.log("MOUNTING VIRTUAL DOM TO THE REAL DOM");
    const appElement = document.getElementById("app");
    if (appElement) {
      mount({ vnode: vdom1, container: appElement });
    } else {
      console.log("Failed to find the app element in the DOM.");
    }
    console.log("---------------------------------");

    // Third timeout for patching virtual DOM elements
    setTimeout(() => {
      console.log("PATCHING VIRTUAL DOM ELEMENTS");
      patch({ oldVNode: vdom1, newVNode: vdom2 });
      console.log("---------------------------------");
    }, 2000); // 2 seconds after mounting
  }, 2000); // 2 seconds after creating
}, 2000); // Initial 2 seconds delay
