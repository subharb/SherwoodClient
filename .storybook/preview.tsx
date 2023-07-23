import type { Preview } from "@storybook/react";
import React from 'react';
import ProviderSherwood from "../src/providerSherwood";


const preview: Preview = {
    decorators:[
        (Story) => (
            <ProviderSherwood>
                
                {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                <Story />
                
                
            </ProviderSherwood>
          ),
       ],
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
        },
  },
};

export default preview;