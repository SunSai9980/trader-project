import { CARETAKERS } from "./../constants/index";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { EnumPath } from "@/enums";
import { useUserInfo } from "@/store";
import { CARETAKERS_ROLE } from "@/constants";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/entry-process",
    children: [
      {
        path: "entry-process",
        name: "EntryProcess",
        meta: {
          label: "合作流程",
        },
        component: () => import("@/views/entry-process/index.vue"),
      },
      {
        path: "union-inquiry",
        name: "UnionInquiry",
        meta: {
          label: "工会询价",
        },
        component: () => import("@/views/union-inquiry/union-inquiry.vue"),
      },
      {
        path: "merchant-audit",
        name: "MerchantAudit",
        meta: {
          label: "商户审核",
        },
        component: () => import("@/views/merchant-audit/merchant-audit.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/error",
    name: "失败",
    component: () => import("@/views/error/error.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach((to, _from, next) => {
  const user = useUserInfo();
  if (CARETAKERS_ROLE.includes(to.name as string)) {
    if (CARETAKERS.includes(to.query.mobile as string)) {
      next();
    } else {
      next("/error");
    }
  } else if (to.path !== EnumPath.LOGIN) {
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
