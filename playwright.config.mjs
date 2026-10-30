import { defineConfig } from "@playwright/test"
import { ORIGIN } from "./scripts/screenshot-evidence.mjs"

export default defineConfig({
  testDir: "./test/visual",
  workers: 1,
  retries: 0,
  timeout: 30000,
  globalTimeout: 120000,
  reporter: "list",
  outputDir: "screenshot-diagnostics",
  use: { browserName: "chromium", baseURL: ORIGIN, reducedMotion: "reduce", serviceWorkers: "block", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 } },
    { name: "phone", use: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3183",
    url: ORIGIN,
    reuseExistingServer: false,
    timeout: 45000,
  },
})
