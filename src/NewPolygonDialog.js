import Overlay from "ol/Overlay";

export default class NewPolygonDialog {
  constructor() {
    const newPolygonDialogContainer = document.createElement("div");
    newPolygonDialogContainer.classList.add("new-polygon-dialog-container");

    const newPolygonDialogForm = document.createElement("form");
    const newPolygonDialogNameInput = document.createElement("input");
    const newPolygonDialogAddButton = document.createElement("button");
    newPolygonDialogAddButton.innerText = "Add";
    newPolygonDialogNameInput.placeholder = "Name";

    newPolygonDialogForm.appendChild(newPolygonDialogNameInput);
    newPolygonDialogForm.appendChild(newPolygonDialogAddButton);
    newPolygonDialogContainer.appendChild(newPolygonDialogForm);

    document.body.appendChild(newPolygonDialogContainer);

    this.click = (event) => {};

    newPolygonDialogForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.click(newPolygonDialogNameInput.value);
    });

    this.overlay = new Overlay({
      element: newPolygonDialogContainer,
      positioning: "center-center",
    });
  }
}
