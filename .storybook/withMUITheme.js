import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from '../src/themes/dark.theme';

export const withMuiTheme = (Story) => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);