import type { Preview } from "@storybook/react";


import { themes } from "@storybook/theming";
import { ThemeProvider, DefaultTheme } from 'styled-components';
import React from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import '../src/app/globals.css';

import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.MAPBOX_TOKEN ?? '';

const theme = {
  default: "default"
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.light
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
