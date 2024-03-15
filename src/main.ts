import { createApp } from "vue";
import router from "@/router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import "element-plus/theme-chalk/dark/css-vars.css";
import "virtual:uno.css";
import "@/assets/style/reset.scss";

const pinia = createPinia().use(piniaPluginPersistedstate);
createApp(App).use(router).use(pinia).mount("#app");
