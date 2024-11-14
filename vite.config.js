import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/predict": {
        target: "https://turnerscars-prediction.cognitiveservices.azure.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/predict/, ""),
      },
    },
  },
});
