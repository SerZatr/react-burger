import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  responseTimeout: 30000,
  e2e: {
    baseUrl: 'http://localhost:3000'
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
