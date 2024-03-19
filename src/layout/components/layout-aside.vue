<template>
  <el-scrollbar h-full>
    <!--      background-color="#409EFF"  -->
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
      <!-- <el-menu-item index="2">
        <el-icon><House /></el-icon>
        <template #title>工会询价</template>
      </el-menu-item> -->
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { House } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const defaultActive = ref(route.path);
const menuArr = [
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
    icon: House,
  },
];

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log("open", key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log("close", key, keyPath);
};
</script>

<style scoped lang="scss">
:deep(.is-active) {
  background-color: #409eff;
}
</style>
