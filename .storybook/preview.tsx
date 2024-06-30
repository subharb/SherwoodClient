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

localStorage.setItem("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOWM2ZGQ3NGEtMjM2Mi00YTMwLWI4MjYtMTAzMzBmMjUwYzA3Iiwia2V5UmVzZWFyY2hlciI6IlUyRnNkR1ZrWDEvRWl3NXlBeFg1SUxVbUZuQVRoVFA5WHVMeGd6TXBVUXdLeWFmZTc0dmdnUWd2VE1zRWVHNjNhcE9vc0RXVmpnL2RLNDQ0QU1VZHdnPT0iLCJuYW1lIjoiUGVkcm8gIiwic3VybmFtZXMiOiItIFNoZXJ3b29kIFN0YWZmIiwiaWF0IjoxNjkwODE5Mzk0LCJleHAiOjE2OTM0MTEzOTR9.laZSUMNq9wLAMbhtIVfaaPlDRbX-z1ggU6yNligxCdY");
localStorage.setItem("rawKeyResearcher", "rSyj7mlA8u-59Zj5tdqjJDwhWpQtM_Di4Z1dUSttqag");
export const keyInvestigation = "U2FsdGVkX18fT2EbLLbDNcWbU8GD5jtpIirnl6mHKISLsbjaxMszbo3Lr3u25tZ+uEB2pfYHJ0DaquqK11M6oQ==";

localStorage.setItem("type", "researcher");
localStorage.setItem("password", "Cabezadesherwood2");

localStorage.setItem("language", "fr");

export default preview;