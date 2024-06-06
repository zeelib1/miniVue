import { createVirtualElement } from "./utils/createVirtualElements.js";
import { createVirtualText } from "./utils/createVirtualText.js";

// Create a virtual DOM element
const virtualDOM = createVirtualElement(
  "h1",
  { class: "h1-class" },
  [createVirtualText("Text node")],
  "text",
  (event, callback) => {
    callback();
  }
);
console.log(virtualDOM);
virtualDOM?.customEventListener?.("click", () =>
  console.log("Welcome from the event listener!")
);
