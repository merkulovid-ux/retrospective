import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  webServer: {
    command: "npx http-server -p 8080 -c-1 .",
    url: "http://localhost:8080/",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:8080/",
    trace: "on-first-retry",
  },
  reporter: [["list"]],
});