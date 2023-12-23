import "./css/style.css";
import "./css/map.css";

import createView from "./createView";
import createMap from "./createMap";
import createLayers from "./createLayers";
import createInteractions from "./createInteractions";
import registerProjectionEPSG2393 from "./registerProjectionEPSG2393";

registerProjectionEPSG2393();

const view = createView();
const layers = createLayers();
const map = createMap(view, layers);

createInteractions(map);
