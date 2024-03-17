<template>
  <el-scrollbar h-full>
    <el-menu default-active="1" @open="handleOpen" @close="handleClose">
      <el-menu-item index="1">
        <el-icon><House /></el-icon>
        <template #title>商户入驻</template>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><House /></el-icon>
        <template #title>商户入驻</template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { House } from "@element-plus/icons-vue";

const handleOpen = (key: string, keyPath: string[]) => {
  console.log("open", key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log("close", key, keyPath);
};
</script>

<style scoped lang="scss"></style>
