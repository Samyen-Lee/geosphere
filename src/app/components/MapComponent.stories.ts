import { Meta, StoryObj } from "@storybook/react";
import MapComponent from "./MapComponent";

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

export const Map: Story = {};
