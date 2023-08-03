// test-utils.js
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from './theme'; // Your theme object
import ProviderSherwood from '../providerSherwood';

const customRender = (ui, options) =>
  render(<ProviderSherwood>{ui}</ProviderSherwood>, options);

export * from '@testing-library/react'; // re-export everything

export { customRender as render };
