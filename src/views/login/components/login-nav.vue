<template>
  <div
    class="flex px-[20px] py-[10px] justify-between items-center border-b border-black"
  >
    <div class="font-semibold">阿拉教师码 | 商户平台</div>
    <div class="flex justify-center items-center">
      <el-button type="primary" link @click="$emit('onClick')" class="mr-[20px]"
        >申请入驻</el-button
      >
      <el-button type="primary" @click="$emit('onClick')">登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
