<template>
  <div class="flex items-center justify-between w-full">
    <div class="flex items-center font-semibold">阿拉教师码 | 合作平台</div>
    <div class="flex items-center">
      <span
        class="text-[#409EFF] mr-3 cursor-pointer"
        @click="dialogTableVisible = true"
        >查看协议</span
      >
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
  </div>

  <el-dialog v-model="dialogTableVisible" title="查看协议" width="800">
    <el-divider class="!mt-0" />
    <commAgreement class="" />
  </el-dialog>
</template>

<script setup lang="ts">
import { useUserInfo } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { State } from "@/enums";
import { computed } from "vue";
import { CARETAKERS_ROLE } from "@/constants";
import commAgreement from "@/components/comm-agreement.vue";

const route = useRoute();
const user = useUserInfo();
const router = useRouter();
const dialogTableVisible = ref(false);
const handleClick = () => {
  router.replace("/login");
  user.$reset();
};
const showMobile = computed(() => {
  return user.state! <= State.declare;
});
</script>

<style scoped lang="scss"></style>
