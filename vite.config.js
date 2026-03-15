import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["motion", "framer-motion", "motion/react"],
  },
  server: {
    allowedHosts: ["chief-shopzilla-previously-sku.trycloudflare.com"],
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
      exclude: /\.svg\?react$/,
    }),
    svgr(),
    tailwindcss(),
  ],
});
