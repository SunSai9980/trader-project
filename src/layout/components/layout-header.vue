<template>
  <div class="flex items-center justify-between w-full">
    <div class="flex items-center font-semibold">阿拉教师码 | 合作平台</div>
    <el-dropdown v-if="!CARETAKERS_ROLE.includes(route.name as string)">
      <div class="flex items-center">
        <img
          class="w-10 h-10 rounded-full block mr-2"
          src="../../assets/images/common/avatar.png"
          alt="avatar"
        />
        <div v-if="showMobile">{{ user.loginMobile }}</div>
        <div v-else>{{ user.enterpriseName }}</div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleClick">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="flex items-center" v-else>
      <img
        class="w-10 h-10 rounded-full block mr-2"
        src="../../assets/images/common/avatar.png"
        alt="avatar"
      />
      <div>{{ route.query.mobile }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserInfo } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { State } from "@/enums";
import { computed } from "vue";
import { CARETAKERS_ROLE } from "@/constants";

const route = useRoute();
const user = useUserInfo();
const router = useRouter();
const handleClick = () => {
  router.replace("/login");
  user.$reset();
};
const showMobile = computed(() => {
  return user.state! <= State.declare;
});
</script>

<style scoped lang="scss"></style>
