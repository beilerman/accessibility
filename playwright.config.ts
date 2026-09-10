import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  webServer: {
    command: "npm run start -- --port 3217",
    port: 3217,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
  use: { baseURL: "http://localhost:3217", screenshot: "only-on-failure" },
});
