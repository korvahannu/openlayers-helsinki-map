import { Map } from "ol";

export default function createMap(view, layers) {
  const target = document.createElement("div");
  target.id = "map-target";
  target.classList.add("map-container");
  document.body.appendChild(target);

  const map = new Map({
    view,
    layers,
    target,
  });

  return map;
}
