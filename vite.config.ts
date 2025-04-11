import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
    },
  },
  build: {
    minify: "esbuild", // Default, but ensures fast minification
    rollupOptions: {
      output: {
        manualChunks: {
          // Group Mantine dependencies into a single chunk
          mantine: [
            "@mantine/core",
            "@mantine/charts",
            "@mantine/dates",
            "@mantine/hooks",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase limit to 1MB to reduce warnings
  },
});
