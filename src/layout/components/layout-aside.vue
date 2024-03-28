<template>
  <el-scrollbar h-full>
    <el-menu
      :default-active="defaultActive"
      @open="handleOpen"
      @close="handleClose"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      :router="true"
    >
      <el-menu-item v-for="item in menuArr" :index="item.router" :key="item.id">
        <el-icon><component :is="item.icon" /></el-icon>
        <template #title>
          <span>{{ item.label }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { House, Collection, WarnTriangleFilled } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { CARETAKERS_ROLE } from "@/constants";
import type { MenuItem } from "@/types";

const route = useRoute();
const defaultActive = computed(() => route.fullPath);

const menuArr = computed<MenuItem[]>(() => {
  if (CARETAKERS_ROLE.includes(route.name as string)) {
    return [
      {
        id: 1,
        label: "商户审核",
        router: route.fullPath,
        icon: WarnTriangleFilled,
      },
    ];
  } else {
    return [
      {
        id: 1,
        label: "商户入驻",
        router: "/entry-process",
        icon: House,
      },
      {
        id: 2,
        label: "工会询价",
        router: "/union-inquiry",
        icon: Collection,
      },
    ];
  }
});

const handleOpen = (_key: string, _keyPath: string[]) => {
  // console.log("open", key, keyPath);
};
const handleClose = (_key: string, _keyPath: string[]) => {
  // console.log("close", key, keyPath);
};
</script>

<style scoped lang="scss">
:deep(.is-active) {
  background-color: #409eff;
}
</style>
