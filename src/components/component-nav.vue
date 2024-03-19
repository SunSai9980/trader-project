<template>
  <div flex w-full flex-justify-between item-center>
    <div class="line-height-[32px]">阿拉教师码 | 商家平台</div>
    <div v-if="!user.id" text-right>
      <span m-r class="center">申请入驻</span>
      <el-button>登录</el-button>
    </div>
    <div v-else flex>
      <img
        class="w-10 h-10 rounded-full block mr-2"
        src="../../assets/images/common/avatar.png"
        alt="avatar"
      />
      <span class="line-height-[32px]">{{ user.loginMobile }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserInfo } from "@/store";
const user = useUserInfo();
</script>

<style scoped lang="scss"></style>
