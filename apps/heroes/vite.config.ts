import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { dynamicBase } from "vite-plugin-dynamic-base";
// import { viteExternalsPlugin } from "vite-plugin-externals";

process.env = { ...process.env, ...loadEnv(process.env.mode, process.cwd()) };
const rootpath = "./src";

// https://vitejs.dev/config/
export default defineConfig({
  root: rootpath,
  base:
    process.env.NODE_ENV === "production"
      ? "window.yayheroMeta.viteDynamicBase"
      : "/",

  plugins: [
    react(),
    // viteExternalsPlugin(
    //   {
    //     react: "React",
    //     "react-dom": "ReactDOM",
    //   },
    //   { disableInServe: true }
    // ),
    dynamicBase({
      publicPath: "window.yayheroMeta.viteDynamicBase",
    }),
    // visualizer({ template: "treemap", emitFile: true, filename: "stats.html" }),
  ],

  resolve: {
    alias: [
      { find: "@src", replacement: path.resolve(__dirname, "src") },
      // fix less import by: @import ~
      { find: /^~/, replacement: "" },
    ],
  },
  build: {
    manifest: true,
    emptyOutDir: true,
    outDir: path.resolve("../../assets", "dist/hero"),
    assetsDir: "",
    rollupOptions: {
      input: {
        "main.tsx": path.resolve(__dirname, rootpath, "main.tsx"),
      },
    },
  },
  server: {
    cors: true,
    strictPort: true,
    port: 3000,
    origin: `${process.env.VITE_SERVER_ORIGIN}`,
    hmr: {
      port: 3000,
      host: "localhost",
      protocol: "ws",
    },
  },
});
