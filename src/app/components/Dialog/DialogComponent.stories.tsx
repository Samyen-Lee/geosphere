import { Meta, StoryObj } from "@storybook/react";
import { DialogComponent } from "./DialogComponent";
import { useState } from "react";

const meta = {
  title: "Components/Dialog",
  component: DialogComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof DialogComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicDialog: Story = {
  args: {
    open: true,
    coordinates: [],
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const closeModal = () => {
      setOpen(false);
    };
    return <DialogComponent {...args} open={open} onClose={closeModal} />;
  },
};
