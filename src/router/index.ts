import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { EnumPath } from "@/enums";
import { useUserInfo } from "@/store";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/entry-process",
    children: [
      {
        path: "entry-process",
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
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach((to, from, next) => {
  const userInfo = useUserInfo();
  if (to.path !== EnumPath.LOGIN) {
    if (!userInfo.user.id) {
      next(EnumPath.LOGIN);
    }
  }
  next();
});

export default router;
