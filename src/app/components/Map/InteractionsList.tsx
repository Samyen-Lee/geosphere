import { MapIntercationFn } from "@/types/MapSource";
import mapboxgl, { EventData, MapLayerEventType } from "mapbox-gl";
import { MutableRefObject } from "react";

const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});

export const displayPopup: MapIntercationFn<keyof MapLayerEventType> = (
  e,
  map
) => {
  if (!map?.current || !e) return;

  // Change the cursor style as a UI indicator.
  map.current.getCanvas().style.cursor = "pointer";

  // Copy coordinates array.
  if (e.features && e.features.length > 0) {
    const coordinates = e.features[0].geometry?.coordinates?.slice();
    const description =
      e.features[0]?.properties && e.features[0]?.properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // // Populate the popup and set its coordinates
    // // based on the feature found.
    // const myElement = <div>Hello, world!</div>;

    // // Rendez l'élément React dans une chaîne HTML
    // const htmlString = ReactDOMServer.renderToString(myElement);

    // // Créez un élément DOM à partir de la chaîne HTML
    // const tempDiv = document.createElement("div");
    // tempDiv.innerHTML = htmlString;

    // // Obtenez le premier enfant (le nœud DOM) du conteneur temporaire
    // const node: Node | null = tempDiv.firstChild;

    // node &&
    // popup.setLngLat(coordinates).setDOMContent(node).addTo(map.current);

    popup.setLngLat(coordinates).setHTML(description).addTo(map.current);
  }
};

export const closePopup: MapIntercationFn<keyof MapLayerEventType> = (
  e,
  map
) => {
  if (map?.current) {
    map.current.getCanvas().style.cursor = "";
    popup.remove();
  }
};

export const displayModal: MapIntercationFn<keyof MapLayerEventType> = (
  e,
  _,
  onOpen: (coord: number[]) => void
) => {
  if (e?.features && e.features.length > 0) {
    const coordinates = e.features[0].geometry?.coordinates?.slice();
    onOpen(coordinates);
  }
};
