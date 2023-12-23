import Draw from "ol/interaction/Draw";
import Button from "./button";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { getCenter } from "ol/extent";
import createNewPolygonDialog from "./createNewPolygonDialog";

export default function createInteractions(map) {
  const newPolygonDrawInteraction = new Draw({
    type: "Polygon",
  });
  const newPolygonLayer = new VectorLayer({});

  newPolygonDrawInteraction.setActive(false);

  const newPolygonButton = new Button("✍️");
  const cancelNewPolygonButton = new Button("❌");
  const newPolygonDialog = createNewPolygonDialog();

  map.addInteraction(newPolygonDrawInteraction);
  map.addControl(newPolygonButton.control);

  newPolygonButton.click = function () {
    newPolygonDrawInteraction.setActive(true);
    map.removeControl(newPolygonButton.control);
    map.addControl(cancelNewPolygonButton.control);
  };

  cancelNewPolygonButton.click = function () {
    newPolygonDrawInteraction.setActive(false);
    map.removeControl(cancelNewPolygonButton.control);
    map.addControl(newPolygonButton.control);
    newPolygonLayer.setSource(undefined);
    map.removeOverlay(newPolygonDialogOverlay);
  };

  newPolygonDrawInteraction.on("drawend", (event) => {
    newPolygonDrawInteraction.setActive(false);

    newPolygonLayer.setSource(
      new VectorSource({
        features: [event.feature],
      })
    );

    map.addLayer(newPolygonLayer);
    map.addOverlay(newPolygonDialog);

    const newPolygonExtent = event.feature.getGeometry().getExtent();

    newPolygonDialog.setPosition(getCenter(newPolygonExtent));
  });
}
