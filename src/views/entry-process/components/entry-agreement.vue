<template>
  <el-steps
    class="w-full pb-10 pt-5 px-10 border-y-[1px] steps"
    :active="active"
    finish-status="success"
    align-center
  >
    <el-step title="商户知晓协议">
      <!-- <template #description>
        <div>{{ user.loginMobile! }}</div>
        <div>{{ dayjs(user.createTime).format("YYYY-MM-DD HH:mm") }}</div>
      </template> -->
    </el-step>
    <el-step title="商户申报材料">
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
    <el-step title="市教育工会审核材料">
      <!-- <template #description>
        <div>管理员</div>
        <div>{{ dayjs(user.createTime).format("YYYY-MM-DD HH:mm") }}</div>
      </template> -->
    </el-step>

    <el-step class="relative" title="市教育工会同意合作">
      <template #description>
        <div
          class="absolute top-[-10px] left-0 translate-x-[-50%] text-#8d8dae"
        >
          商户等待评审
        </div>
      </template>
    </el-step>
    <el-step v-if="isFullProcess" title="上传协议"></el-step>
    <el-step v-if="isFullProcess" title="完成"></el-step>
    <!-- <div>商户等待评审</div> -->
  </el-steps>
</template>

<script lang="ts" setup>
// import { defineProps } from "vue";
// import { useUserInfo } from "@/store";
// import dayjs from "dayjs";
withDefaults(defineProps<{ active: number; isFullProcess?: boolean }>(), {
  active: 0,
  isFullProcess: false,
});

// const user  = useUserInfo();
</script>
<style scoped lang="scss">
.steps {
  border-color: #a8abb2;
}
</style>
