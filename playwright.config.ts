import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./_tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "https://advantageonlineshopping.com",
    trace: "retain-on-failure",
  },
  timeout: 60000,

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        //viewport: { width: 1920, height: 1080 },
      },
    },

    // {
    //   name: "mobileChrome",
    //   use: { ...devices["Pixel 5"] },
    // },
  ],
});
