import View from "ol/View";

export default function createView() {
  // Helsinki center
  const center = [3385524.962815682, 6675786.330396135];

  // Extent is somewhere around kehä 3
  const extent = [
    3361144.6036124234, 6665245.288763832, 3403438.3055184656,
    6692141.035825163,
  ];

  const zoom = 14;

  const projection = "EPSG:2393";

  const view = new View({
    center,
    zoom,
    projection,
    extent,
  });

  return view;
}
