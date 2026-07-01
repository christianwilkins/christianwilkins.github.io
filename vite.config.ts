import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "next/link": path.resolve(__dirname, "src/compat/next-link.tsx"),
      "next/navigation": path.resolve(__dirname, "src/compat/next-navigation.ts"),
      "next/dynamic": path.resolve(__dirname, "src/compat/next-dynamic.tsx"),
      "next/script": path.resolve(__dirname, "src/compat/next-script.tsx"),
    },
  },
});
