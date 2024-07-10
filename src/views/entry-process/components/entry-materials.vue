<template>
  <MaterialsEdit
    v-if="user.materialApplyState === MaterialApplyState.unfinished"
    :user="user"
    :invitationInfo="invitationInfo"
    @onSubmit="handleSubmit"
  />
  <div v-else class="flex justify-center items-center flex-col pt-20">
    <el-icon size="60" color="#67C23A"><i-ep-success-filled /></el-icon>
    <div class="mt-5 text-2xl font-bold">提交成功</div>
    <p class="mt-2 text-gray-400 text-sm">审核时间3-7个工作日</p>
  </div>
</template>

<script setup lang="ts">
import {
  State,
  MaterialApplyState,
  RiskType,
  CooperateTime,
  ServiceRange,
} from "@/enums";
import { apiUpdateUser, apiCleanCooperate } from "@/api/user";
import { apiUseCode } from "@/api/common";
import MaterialsEdit from "@/components/materials-edit.vue";
import { useUserInfo, useInvitationInfo } from "@/store";
import { Materials, User } from "@/types";

const emits = defineEmits(["stepNext"]);

let user = useUserInfo();
let invitationInfo = useInvitationInfo();

const judgementRisk = (materialsForm: Materials) => {
  let num = 0;
  if (
    materialsForm.cooperateTime === CooperateTime.moreThanThreeMonths ||
    materialsForm.cooperateTime === CooperateTime.LongCooperation ||
    materialsForm.cooperateTime === CooperateTime.Other
  ) {
    num++;
  }
  if (materialsForm.servicePrice >= 50000) {
    num++;
  }
  if (materialsForm.serviceJoinUserNum >= 1000) {
    num++;
  }
  if (materialsForm.serviceRange === ServiceRange.LargeCityArea) {
    num++;
  }
  return num;
};

const handleSubmit = async (materialsForm: Materials) => {
  try {
    let highRiskNum = judgementRisk(materialsForm);
    if (highRiskNum < 2) {
      materialsForm.riskType = RiskType.loweRisk;
    } else {
      materialsForm.riskType = RiskType.highRisk;
    }
    materialsForm.state = State.declare;
    materialsForm.materialApplyState = MaterialApplyState.fulfil;
    materialsForm.cooperateType = undefined;
    await apiCleanCooperate(user.id);
    await apiUpdateUser(materialsForm as User);
    if (invitationInfo.code) {
      await apiUseCode(invitationInfo.code);
      invitationInfo.$reset();
    }
    ElMessage({
      type: "success",
      message: "提交成功",
    });
    user.$state = { ...user, ...(materialsForm as User) };
    emits("stepNext", State.declare, MaterialApplyState.fulfil);
  } catch (e) {
    console.error(e);
  }
};
</script>

<style lang="less" scoped></style>
