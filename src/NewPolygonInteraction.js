import Draw from "ol/interaction/Draw";
import Button from "./Button";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { getCenter } from "ol/extent";
import NewPolygonDialog from "./NewPolygonDialog";

export default class NewPolygonInteraction {
  constructor(map) {
    this.drawInteraction = new Draw({
      type: "Polygon",
    });
    this.newPolygonLayer = new VectorLayer({});

    this.drawInteraction.setActive(false);

    this.startDrawingNewPolygonButton = new Button("✍️");
    this.cancelDrawingNewPolygonButton = new Button("❌");
    this.newPolygonDialog = new NewPolygonDialog();
    this.map = map;

    this.map.addInteraction(this.drawInteraction);
    this.map.addControl(this.startDrawingNewPolygonButton.control);

    this.startDrawingNewPolygonButton.click = () =>
      this.enableDrawNewPolygonTool();
    this.cancelDrawingNewPolygonButton.click = () =>
      this.disableDrawNewPolygonTool();

    this.drawInteraction.on("drawend", this.handleDrawEnd);
  }

  enableDrawNewPolygonTool() {
    this.drawInteraction.setActive(true);
    this.map.removeControl(this.startDrawingNewPolygonButton.control);
    this.map.addControl(this.cancelDrawingNewPolygonButton.control);
  }

  disableDrawNewPolygonTool() {
    this.drawInteraction.setActive(false);
    this.map.removeControl(this.cancelDrawingNewPolygonButton.control);
    this.map.addControl(this.startDrawingNewPolygonButton.control);
    this.newPolygonLayer.setSource(undefined);
    this.map.removeOverlay(this.newPolygonDialog.overlay);
    this.map.removeLayer(this.newPolygonLayer);
  }

  handleDrawEnd = (event) => {
    this.drawInteraction.setActive(false);

    this.currentFeature = event.feature;

    this.newPolygonLayer.setSource(
      new VectorSource({
        features: [this.currentFeature],
      })
    );

    this.map.addLayer(this.newPolygonLayer);
    this.map.addOverlay(this.newPolygonDialog.overlay);

    const newPolygonExtent = this.currentFeature.getGeometry().getExtent();

    this.newPolygonDialog.overlay.setPosition(getCenter(newPolygonExtent));
    this.newPolygonDialog.click = this.handleNewPolygonDialogClick;
  };

  handleNewPolygonDialogClick = (name) => {
    this.drawInteraction.setActive(false);
    this.map.removeControl(this.cancelDrawingNewPolygonButton.control);
    this.map.addControl(this.startDrawingNewPolygonButton.control);
    this.newPolygonLayer.setSource(undefined);
    this.map.removeOverlay(this.newPolygonDialog.overlay);
    this.map.removeLayer(this.newPolygonLayer);

    this.map.getLayers().forEach((layer) => {
      if (layer.get("name") === "polygonLayer") {
        this.currentFeature.set("name", name);
        layer.getSource().addFeature(this.currentFeature);
      }
    });
  };
}
