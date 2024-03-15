import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/entry-process",
    children: [
      {
        path: "/entry-process",
        name: "入驻流程",
        component: () => import("@/views/entry-process/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("@/views/login/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
