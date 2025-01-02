import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createHtmlPlugin } from "vite-plugin-html";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    createHtmlPlugin({
      minify: true,
      entry: "/src/index.tsx",
      template: "/public/index.html",
    }),
  ],
  server: {
    host: true,
    port: 3000,
    open: true,
  },
});
