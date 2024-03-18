<template>
  <div flex w-full flex-justify-between item-center>
    <div class="line-height-[32px]">阿拉教师码 | 商家平台</div>
    <div v-if="!user.id" text-right>
      <span m-r class="center">申请入驻</span>
      <el-button>登录</el-button>
    </div>
    <div v-else flex>
      <el-avatar
        class="!h-[32px]"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <span class="line-height-[32px]">13462771841</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
