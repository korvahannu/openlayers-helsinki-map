import Draw from "ol/interaction/Draw";
import Button from "./Button";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { getCenter } from "ol/extent";
import NewPolygonDialog from "./NewPolygonDialog";

export default function createInteractions(map) {
  const newPolygonDrawInteraction = new Draw({
    type: "Polygon",
  });
  const newPolygonLayer = new VectorLayer({});

  newPolygonDrawInteraction.setActive(false);

  const newPolygonButton = new Button("✍️");
  const cancelNewPolygonButton = new Button("❌");
  const newPolygonDialog = new NewPolygonDialog();

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
    map.removeOverlay(newPolygonDialog.overlay);
    map.removeLayer(newPolygonLayer);
  };

  newPolygonDrawInteraction.on("drawend", (event) => {
    newPolygonDrawInteraction.setActive(false);

    newPolygonLayer.setSource(
      new VectorSource({
        features: [event.feature],
      })
    );

    map.addLayer(newPolygonLayer);
    map.addOverlay(newPolygonDialog.overlay);

    const newPolygonExtent = event.feature.getGeometry().getExtent();

    newPolygonDialog.overlay.setPosition(getCenter(newPolygonExtent));

    newPolygonDialog.click = (name) => {
      newPolygonDrawInteraction.setActive(false);
      map.removeControl(cancelNewPolygonButton.control);
      map.addControl(newPolygonButton.control);
      newPolygonLayer.setSource(undefined);
      map.removeOverlay(newPolygonDialog.overlay);
      map.removeLayer(newPolygonLayer);

      map.getLayers().forEach((layer) => {
        if (layer.get("name") === "polygonLayer") {
          event.feature.set("name", name);
          layer.getSource().addFeature(event.feature);
        }
      });
    };
  });
}
