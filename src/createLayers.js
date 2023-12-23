import Tile from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";

export default function createLayers() {
  const osmLayer = new Tile({
    source: new OSM(),
  });

  const polygonLayer = new VectorLayer({
    name: "polygonLayer",
    source: new VectorSource({
      features: [],
    }),
  });

  const layers = [osmLayer, polygonLayer];

  return layers;
}
