// vite.config.ts
import { defineConfig } from "file:///C:/Users/18425/Desktop/h5/trader-project/node_modules/.pnpm/vite@5.1.6_@types+node@20.11.27_sass@1.72.0/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/18425/Desktop/h5/trader-project/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.6_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import AutoImport from "file:///C:/Users/18425/Desktop/h5/trader-project/node_modules/.pnpm/unplugin-auto-import@0.17.5/node_modules/unplugin-auto-import/dist/vite.js";
import UnoCSS from "file:///C:/Users/18425/Desktop/h5/trader-project/node_modules/.pnpm/unocss@0.58.6_postcss@8.4.35_vite@5.1.6/node_modules/unocss/dist/vite.mjs";
import Icons from "file:///C:/Users/18425/Desktop/h5/trader-project/node_modules/.pnpm/unplugin-icons@0.18.5/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///C:/Users/18425/Desktop/h5/trader-project/node_modules/.pnpm/unplugin-icons@0.18.5/node_modules/unplugin-icons/dist/resolver.js";
import Components from "file:///C:/Users/18425/Desktop/h5/trader-project/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///C:/Users/18425/Desktop/h5/trader-project/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/resolvers.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\18425\\Desktop\\h5\\trader-project";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig((configEnv) => {
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
            prefix: "Icon"
          })
        ],
        dts: path.resolve(pathSrc, "auto-imports.d.ts")
      }),
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ["ep"]
          }),
          ElementPlusResolver()
        ],
        dts: path.resolve(pathSrc, "components.d.ts")
      }),
      Icons({
        autoInstall: true
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src")
      }
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
          assetFileNames: "assets/[ext]/[name]-[hash][extname]"
        }
      }
    },
    server: {
      port: 3e3,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: "http://192.168.1.129:8099",
          // 本地
          // target: "https://jyghgys.showyork.com", // 生产
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxODQyNVxcXFxEZXNrdG9wXFxcXGg1XFxcXHRyYWRlci1wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxODQyNVxcXFxEZXNrdG9wXFxcXGg1XFxcXHRyYWRlci1wcm9qZWN0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8xODQyNS9EZXNrdG9wL2g1L3RyYWRlci1wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB0eXBlIHsgQ29uZmlnRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xuaW1wb3J0IFVub0NTUyBmcm9tIFwidW5vY3NzL3ZpdGVcIjtcbmltcG9ydCBJY29ucyBmcm9tIFwidW5wbHVnaW4taWNvbnMvdml0ZVwiO1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSBcInVucGx1Z2luLWljb25zL3Jlc29sdmVyXCI7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmNvbnN0IHBhdGhTcmMgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKTtcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKGNvbmZpZ0VudjogQ29uZmlnRW52KSA9PiB7XG4gIC8vIGNvbnN0IGVudiA9IGxvYWRFbnYoY29uZmlnRW52Lm1vZGUsIHByb2Nlc3MuY3dkKCkpO1xuICByZXR1cm4ge1xuICAgIGJhc2U6IFwiLi9cIixcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIFVub0NTUygpLFxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIGltcG9ydHM6IFtcInZ1ZVwiXSxcbiAgICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxuICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgICAgcHJlZml4OiBcIkljb25cIixcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgZHRzOiBwYXRoLnJlc29sdmUocGF0aFNyYywgXCJhdXRvLWltcG9ydHMuZC50c1wiKSxcbiAgICAgIH0pLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbXCJlcFwiXSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXG4gICAgICAgIF0sXG4gICAgICAgIGR0czogcGF0aC5yZXNvbHZlKHBhdGhTcmMsIFwiY29tcG9uZW50cy5kLnRzXCIpLFxuICAgICAgfSksXG4gICAgICBJY29ucyh7XG4gICAgICAgIGF1dG9JbnN0YWxsOiB0cnVlLFxuICAgICAgfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBcIkBcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6IFwiZGlzdC10cmFkZXItXCIgKyBEYXRlLm5vdygpLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcInZ1ZVwiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJ2dWVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImRheWpzXCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcImRheWpzXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwidmVuZG9yXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bZXh0XS9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiAzMDAwLFxuICAgICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gICAgICBwcm94eToge1xuICAgICAgICBcIi9hcGlcIjoge1xuICAgICAgICAgIHRhcmdldDogXCJodHRwOi8vMTkyLjE2OC4xLjEyOTo4MDk5XCIsIC8vIFx1NjcyQ1x1NTczMFxuICAgICAgICAgIC8vIHRhcmdldDogXCJodHRwczovL2p5Z2hneXMuc2hvd3lvcmsuY29tXCIsIC8vIFx1NzUxRlx1NEVBN1xuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgXCJcIiksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1QsU0FBUyxvQkFBNkI7QUFFNVYsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFlBQVk7QUFDbkIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBQ3BDLE9BQU8sVUFBVTtBQVZqQixJQUFNLG1DQUFtQztBQVl6QyxJQUFNLFVBQVUsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFFN0MsSUFBTyxzQkFBUSxhQUFhLENBQUMsY0FBeUI7QUFFcEQsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsV0FBVztBQUFBLFFBQ1QsU0FBUyxDQUFDLEtBQUs7QUFBQSxRQUNmLFdBQVc7QUFBQSxVQUNULG9CQUFvQjtBQUFBLFVBQ3BCLGNBQWM7QUFBQSxZQUNaLFFBQVE7QUFBQSxVQUNWLENBQUM7QUFBQSxRQUNIO0FBQUEsUUFDQSxLQUFLLEtBQUssUUFBUSxTQUFTLG1CQUFtQjtBQUFBLE1BQ2hELENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNULFdBQVc7QUFBQSxVQUNULGNBQWM7QUFBQSxZQUNaLG9CQUFvQixDQUFDLElBQUk7QUFBQSxVQUMzQixDQUFDO0FBQUEsVUFDRCxvQkFBb0I7QUFBQSxRQUN0QjtBQUFBLFFBQ0EsS0FBSyxLQUFLLFFBQVEsU0FBUyxpQkFBaUI7QUFBQSxNQUM5QyxDQUFDO0FBQUEsTUFDRCxNQUFNO0FBQUEsUUFDSixhQUFhO0FBQUEsTUFDZixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVEsaUJBQWlCLEtBQUssSUFBSTtBQUFBLE1BQ2xDLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGFBQWEsSUFBSTtBQUNmLGdCQUFJLEdBQUcsU0FBUyxLQUFLLEdBQUc7QUFDdEIscUJBQU87QUFBQSxZQUNUO0FBQ0EsZ0JBQUksR0FBRyxTQUFTLE9BQU8sR0FBRztBQUN4QixxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLHFCQUFPO0FBQUEsWUFDVDtBQUFBLFVBQ0Y7QUFBQSxVQUNBLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxVQUNOLFFBQVE7QUFBQTtBQUFBO0FBQUEsVUFFUixjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUM5QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
