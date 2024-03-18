<template>
  <div class="flex items-center justify-between w-full">
    <div class="flex items-center font-semibold">阿拉教师码 | 商户平台</div>
    <div class="flex items-center">
      <img
        class="w-10 h-10 rounded-full block mr-2"
        src="https://th.bing.com/th/id/R.34ac5f0d941e6d119fd3c27b920044dd?rik=Uwh2P0zvxoI9nQ&riu=http%3a%2f%2fimage.xitek.com%2fphoto%2f201604%2f2725%2f272530%2f272530_1459482619_51936700.jpg&ehk=CIZRrSwkEmc7aOjmx1Aei6JM0X04JNYZ9Aif%2b3QzWXg%3d&risl=&pid=ImgRaw&r=0"
        alt="avatar"
      />
      <div>{{ user.mobile }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserInfo } from "@/store";

const user = useUserInfo();
</script>

<style scoped lang="scss"></style>
