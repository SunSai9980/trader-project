import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import UnoCSS from "unocss/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";

const pathSrc = path.resolve(__dirname, "src");
// https://vitejs.dev/config/
export default defineConfig((configEnv: ConfigEnv) => {
  // const env = loadEnv(configEnv.mode, process.cwd());
  return {
    base: "./",
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        imports: ["vue"],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: "Icon",
          }),
        ],
        dts: path.resolve(pathSrc, "auto-imports.d.ts"),
      }),
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ["ep"],
          }),
          ElementPlusResolver(),
        ],
        dts: path.resolve(pathSrc, "components.d.ts"),
      }),
      Icons({
        autoInstall: true,
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    build: {
      outDir: "dist-trader-" + Date.now(),
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("vue")) {
              return "vue";
            }
            if (id.includes("dayjs")) {
              return "dayjs";
            }
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash][extname]",
        },
      },
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: "http://192.168.1.129:8099",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
