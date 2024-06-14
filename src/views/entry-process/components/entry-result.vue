<template>
  <div
    v-if="user.state === State.error"
    class="flex justify-center items-center flex-col py-20"
  >
    <el-icon size="60" color="#F56C6C"><i-ep-circle-close-filled /></el-icon>
    <div class="mt-5 text-2xl font-bold">核验失败</div>
    <p class="mt-2 text-gray-400 text-sm">
      请核对并修改以下信息后，再重新提交。
    </p>
    <div class="p-8 bg-slate-50 mt-5 rounded-lg w-4/5">
      <div class="font-semibold text-lg text-slate-600">理由</div>
      <div class="mt-2 flex">
        <el-icon color="#F56C6C"><i-ep-circle-close-filled /></el-icon>
        <div class="ml-3 text-sm text-slate-500">
          {{ user.reason }}
        </div>
      </div>
    </div>
    <el-button class="mt-5" type="primary" @click="handleRevisit"
      >重新提交</el-button
    >
  </div>
  <div
    v-else-if="user.state === State.declare && user.cooperateType"
    class="flex justify-center items-center flex-col pt-20"
  >
    <el-icon size="60" color="#67C23A"><i-ep-success-filled /></el-icon>
    <div class="mt-5 text-2xl font-bold">提交成功</div>
    <p class="mt-2 text-gray-400 text-sm">审核时间3-7个工作日</p>
  </div>
  <div
    v-else-if="user.state === State.successes"
    class="flex justify-center items-center flex-col pt-20"
  >
    <el-icon size="60" color="#67C23A"><i-ep-success-filled /></el-icon>
    <div class="mt-5 text-2xl font-bold">核验成功</div>
    <p class="mt-2 text-gray-400 text-sm">您提交的资料已通过核验</p>
  </div>
  <div
    v-else-if="user.state === State.ShortlistingSuccess"
    class="flex justify-center items-center flex-col py-20"
  >
    <el-icon size="60" color="#67C23A"><i-ep-success-filled /></el-icon>
    <div class="mt-5 text-2xl font-bold">申请完成</div>
    <p class="mt-2 text-gray-400 text-sm">
      您的合作申请已通过，平台将于7个工作日内联系您确认签约事宜。
    </p>
    <!-- <el-button type="primary" class="mt-5" @click="goLogin">前往登录</el-button> -->
  </div>
  <div v-else class="flex justify-center items-center flex-col py-20">
    <el-icon size="60" color="#F56C6C"><i-ep-circle-close-filled /></el-icon>
    <div class="mt-5 text-2xl font-bold">申请失败</div>
    <p class="mt-2 text-gray-400 text-sm">您提交的申请被退回</p>
    <el-button type="primary" class="mt-5" @click="handleRevisitError"
      >重新发起</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { State, MaterialApplyState } from "@/enums";
import { apiUpdateUser } from "@/api/user";
import { useUserInfo } from "@/store";

const emits = defineEmits(["stepNext"]);
const user = useUserInfo();
const handleRevisit = async () => {
  await apiUpdateUser({
    id: user.id,
    state: State.declare,
    materialApplyState: MaterialApplyState.unfinished,
  });
  emits("stepNext", State.declare, MaterialApplyState.unfinished);
};
// const goLogin = () => {
//   window.location.href = "https://education.showyork.com/education/#/login";
// };
const handleRevisitError = async () => {
  await apiUpdateUser({
    id: user.id,
    state: State.know,
    materialApplyState: MaterialApplyState.unfinished,
  });
  emits("stepNext", State.know, MaterialApplyState.unfinished);
};
</script>

<style scoped lang="scss"></style>
