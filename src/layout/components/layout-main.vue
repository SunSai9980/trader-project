<template>
  <div bg-white h-full w-full rounded-lg class="min-h">
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.min-h {
  min-height: calc(100vh - 60px - 20px);
}
</style>
