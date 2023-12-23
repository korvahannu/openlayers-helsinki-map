import Control from "ol/control/Control";

export default class Button {
  constructor(innerText) {
    const button = document.createElement("button");
    button.classList.add("ol-control");
    button.classList.add("new-polygon-button");
    button.innerText = innerText;
    this.element = button;

    this.control = new Control({
      element: this.element,
    });

    this.click = (event) => {};

    this.element.addEventListener("click", (event) => {
      this.click(event);
    });
  }
}
