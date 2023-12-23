import Tile from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export default function createLayers() {
  const osmLayer = new Tile({
    source: new OSM(),
  });

  const layers = [osmLayer];

  return layers;
}
