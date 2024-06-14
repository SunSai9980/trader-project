<template>
  <el-steps
    class="w-full pb-10 pt-5 px-10 border-y-[1px] steps"
    :active="active"
    finish-status="success"
    align-center
  >
    <el-step title="知晓协议">
      <!-- <template #description>
        <div>{{ user.loginMobile! }}</div>
        <div>{{ dayjs(user.createTime).format("YYYY-MM-DD HH:mm") }}</div>
      </template> -->
    </el-step>
    <el-step title="申报材料">
      <!-- <template #description>
        <div>{{ user.loginMobile }}</div>
        <div>{{ dayjs(user.createTime).format("YYYY-MM-DD HH:mm") }}</div>
      </template> -->
    </el-step>
    <el-step title="平台核验材料">
      <!-- <template #description>
        <div>{{ user.loginMobile }}</div>
        <div>{{ dayjs(user.createTime).format("YYYY-MM-DD HH:mm") }}</div>
      </template> -->
    </el-step>
    <el-step title="市教育工会审批">
      <!-- <template #description>
        <div>管理员</div>
        <div>{{ dayjs(user.createTime).format("YYYY-MM-DD HH:mm") }}</div>
      </template> -->
    </el-step>
    <el-step title="完成">
      <!-- <template #description>
        <div>管理员</div>
        <div>{{ dayjs(user.createTime).format("YYYY-MM-DD HH:mm") }}</div>
      </template> -->
    </el-step>
  </el-steps>
</template>

<script lang="ts" setup>
// import { defineProps } from "vue";
// import { useUserInfo } from "@/store";
// import dayjs from "dayjs";
withDefaults(defineProps<{ active: number }>(), { active: 0 });

// const user  = useUserInfo();
</script>
<style scoped lang="scss">
.steps {
  border-color: #a8abb2;
}
</style>
