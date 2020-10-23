import Keyboard from "simple-keyboard";
import Layouts from "simple-keyboard-layouts";
import "simple-keyboard/build/css/index.css";
import "./index.css";

const layouts = new Layouts();
const allLayouts = layouts.get();

let keyboard = new Keyboard({
  onChange: (input) => onChange(input),
  onKeyPress: (button) => onKeyPress(button),
  layout: layouts.get("english")
});

const setLayout = (layout) => {
  console.log(layout);
  keyboard.setOptions({ layout });
};

Object.keys(allLayouts).forEach((layoutName) => {
  const layoutLink = document.createElement("button");
  layoutLink.innerHTML = layoutName;
  layoutLink.onclick = () => setLayout(allLayouts[layoutName]);
  document.querySelector(".layouts").appendChild(layoutLink);
});

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", (event) => {
  keyboard.setInput(event.target.value);
});

console.log(keyboard);

function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);

  /**
   * If you want to handle the shift and caps lock buttons
   */
  if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle
  });
}
