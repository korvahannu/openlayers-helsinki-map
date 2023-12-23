import proj4 from "proj4";
import { register } from "ol/proj/proj4";

export default function registerProjectionEPSG2393() {
  proj4.defs(
    "EPSG:2393",
    "+proj=tmerc +lat_0=0 +lon_0=27 +k=1 +x_0=3500000 +y_0=0 +ellps=intl +towgs84=-96.062,-82.428,-121.753,-4.801,-0.345,1.376,1.496 +units=m +no_defs +type=crs"
  );

  register(proj4);
}
