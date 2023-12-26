import Overlay from "ol/Overlay";

export default class NewPolygonDialog {
  constructor() {
    this.newPolygonDialogContainer = document.createElement("div");
    this.newPolygonDialogContainer.classList.add(
      "new-polygon-dialog-container"
    );

    this.newPolygonDialogForm = document.createElement("form");
    this.newPolygonDialogNameInput = document.createElement("input");
    this.newPolygonDialogAddButton = document.createElement("button");
    this.newPolygonDialogAddButton.innerText = "Add";
    this.newPolygonDialogNameInput.placeholder = "Name";

    this.newPolygonDialogForm.appendChild(this.newPolygonDialogNameInput);
    this.newPolygonDialogForm.appendChild(this.newPolygonDialogAddButton);
    this.newPolygonDialogContainer.appendChild(this.newPolygonDialogForm);

    document.body.appendChild(this.newPolygonDialogContainer);

    this.click = (event) => {};

    this.newPolygonDialogForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.click(this.newPolygonDialogNameInput.value);
      this.newPolygonDialogNameInput.value = null;
    });

    this.overlay = new Overlay({
      element: this.newPolygonDialogContainer,
      positioning: "center-center",
    });
  }

  focus() {
    this.newPolygonDialogNameInput.focus();
  }
}
