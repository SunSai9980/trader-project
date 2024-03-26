<template>
  <div class="px-20 mt-10 pb-[64px]"><commAgreement /></div>
  <div
    class="shadow mt-6 py-3 px-10 flex items-center fixed bottom-0 right-[20px] left-[220px] bg-#fff"
  >
    <el-button
      size="large"
      type="primary"
      :disabled="!checked"
      class="mr-3 w-20"
      @click="handleClick"
      >提 交</el-button
    >
    <el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { apiUpdateUser } from "@/api/user";
import { useUserInfo } from "@/store";
import { MaterialApplyState, State } from "@/enums";
import commAgreement from "@/components/comm-agreement.vue";

const user = useUserInfo();
const checked = ref(false);
const emits = defineEmits(["stepNext"]);
const handleClick = async () => {
  await apiUpdateUser({
    id: user.id,
    state: State.declare,
    materialApplyState: MaterialApplyState.unfinished,
  });
  emits("stepNext", State.declare, MaterialApplyState.unfinished);
};
</script>

<style scoped lang="scss">
.shadow {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
}
</style>
