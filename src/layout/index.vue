<template>
  <div class="common-layout" h-screen>
    <el-container>
      <el-header
        class="flex items-center justify-between z-10"
        style="box-shadow: 0 5px 5px -5px gray"
      >
        <layoutHeader />
      </el-header>
      <el-container class="aside">
        <el-aside width="200px" h-full class="bg-#001529">
          <layout-aside />
        </el-aside>
        <el-scrollbar h-full>
          <el-main class="main p-[20px] !pb-0">
            <layoutMain />
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import layoutAside from "./components/layout-aside.vue";
import layoutHeader from "./components/layout-header.vue";
import layoutMain from "./components/layout-main.vue";
</script>

<style scoped lang="scss">
.aside {
  height: calc(100vh - 60px);
}
.main {
  background: #f0f2f5;
  width: calc(100vw - 200px);
  > div {
    border-radius: 8px;
  }
}
</style>
