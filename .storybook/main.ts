import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-onboarding",
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  viteFinal: (config) => {
    if (!config.build) {
     config.build = {} 
    } 
    if(!config.build.rollupOptions) {
      config.build.rollupOptions = {};
    }
    config.build.rollupOptions.experimental = {
      strictExecutionOrder: true
    };
    return config;
  }
};
export default config;