<template>
  <div class="pt-[130px]">
    <div class="text-center text-3xl font-bold title">赋能工会 传递关爱</div>
    <div class="mt-3 flex justify-center">
      <div class="px-4 text-sm text-neutral-500 label">便捷高效</div>
      <div class="px-4 text-sm text-neutral-500 label">透明合规</div>
      <div class="px-4 text-sm text-neutral-500 label">统筹管理</div>
      <div class="px-4 text-sm text-neutral-500">升级体验</div>
    </div>
    <img
      class="mt-10 w-[999px] m-auto block"
      src="../../../assets/images/login/workflows.png"
      alt="流程图"
    />
    <el-button
      type="primary"
      class="m-auto !block mt-7"
      @click="$emit('onClick')"
      >申请入驻</el-button
    >
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.title {
  position: relative;
  &::after {
    content: "";
    width: 100px;
    height: 2px;
    display: block;
    position: absolute;
    background-image: url("@/assets/images/login/ornamental.png");
    background-size: 100%;
    background-position: center;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
  }
}
.label {
  position: relative;
  &::after {
    content: "";
    width: 1px;
    height: 12px;
    display: block;
    position: absolute;
    right: 0;
    bottom: 50%;
    transform: translateY(50%);
    background: rgb(115 115 115);
  }
}
</style>
