import Tile from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Text from "ol/style/Text";
import Stroke from "ol/style/Stroke";

export default function createLayers() {
  const osmLayer = new Tile({
    source: new OSM(),
  });

  const getPolygonStyle = () =>
    new Style({
      fill: new Fill({
        color: [255, 255, 255, 0.75],
      }),
      stroke: new Stroke({
        color: [0, 0, 204],
        width: 2,
        lineDash: [2, 5],
      }),
    });

  const polygonLayer = new VectorLayer({
    name: "polygonLayer",
    source: new VectorSource({
      features: [],
    }),
    style: (feature) => {
      const name = feature.get("name");
      const textStyle = new Style({
        text: new Text({
          text: name,
          scale: 1.5,
          fill: new Fill({
            color: [100, 0, 150],
          }),
          font: "bold 10px arial",
        }),
      });
      feature.setStyle([getPolygonStyle(), textStyle]);
    },
  });

  return {
    layersArray: [osmLayer, polygonLayer],
    layersObject: {
      osmLayer,
      polygonLayer,
    },
  };
}
