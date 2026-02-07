import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["motion", "framer-motion", "motion/react"],
  },
  server: {
    allowedHosts: ["bite-distinction-cadillac-jul.trycloudflare.com"],
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
});
