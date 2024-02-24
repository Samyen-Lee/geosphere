import { Meta, StoryObj } from "@storybook/react";
import MapComponent from "./MapComponent";

import places from "../../datas/places-collection.json";
import { GeoJSONSourceRaw } from "mapbox-gl";
import { closePopup, displayPopup } from "./InteractionsList";

const meta = {
  title: "Components/Map",
  component: MapComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof MapComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicMap: Story = {};

export const MapWithControls: Story = {
  args: {
    controls: true,
  },
};

export const MapWithInteractions: Story = {
  args: {
    controls: true,
    sources: [
      {
        name: "places",
        data: {
          type: "geojson",
          data: JSON.parse(JSON.stringify(places)),
        },
      },
    ],
    layers: [
      {
        id: "places",
        type: "circle",
        source: "places",
        paint: {
          "circle-color": "#4264fb",
          "circle-radius": 6,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      },
    ],
    interactions: [
      {
        eventType: "mouseenter",
        featureId: "places",
        interactionFn: displayPopup
      },
      {
        eventType: "mouseleave",
        featureId: "places",
        interactionFn: closePopup
      },
    ]
  },
};
