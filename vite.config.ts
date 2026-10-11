import path from "node:path";
import brand from "./public/brand/identity.json";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), {
    name: "canonical-personal-brand",
    transformIndexHtml(html) {
      const escape = (text: string) => text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
      return html.replaceAll("%BRAND_NAME%", escape(brand.name))
        .replaceAll("%BRAND_ROLE%", escape(brand.role))
        .replaceAll("%BRAND_TITLE%", escape(`${brand.name} | ${brand.role}`));
    },
  }],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
        },
      },
    },
  },
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
