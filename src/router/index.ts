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
      {
        path: "union-inquiry",
        name: "工会询价",
        component: () => import("@/views/union-inquiry/union-inquiry.vue"),
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
  const user = useUserInfo();
  if (to.path !== EnumPath.LOGIN) {
    if (!user.id) {
      next(EnumPath.LOGIN);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
