import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const pocketbase_url = "http://localhost:3002"; // localhost-to-localhost

const grafana_url = "http://localhost:3001"; // localhost-to-localhost

const config: UserConfig = {
  plugins: [sveltekit()],
  server: {
    proxy: {
      // proxy "/api" and "/_" to pocketbase_url
      "/api": pocketbase_url,
      "/_": pocketbase_url,
      "/grafana": grafana_url,
    },
  },
};

export default config;