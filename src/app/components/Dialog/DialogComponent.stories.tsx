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
    // coordinates: [],
    title: "Title",
    desc: "Description",
    feature: {
      id: 338595071,
      properties: {
        name_script: "Latin",
        "category_zh-Hans": "大学",
        type: "University",
        filterrank: 1,
        category_en: "University",
        name_en: "American University",
        sizerank: 15,
        iso_3166_1: "US",
        maki: "college",
        name_ar: "الجامعة الأميركية",
        iso_3166_2: "US-DC",
        name_es: "Universidad Americana",
        class: "education",
        name: "American University",
      },
      coordinates: [-77.08926200866699, 38.93724724198066],
    },
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    const closeModal = () => {
      setOpen(false);
    };
    return <DialogComponent {...args} open={open} onClose={closeModal} />;
  },
};
