<template>
  <el-steps
    class="w-full pb-10 pt-5 px-10 border-y-[1px] steps"
    :active="active"
    finish-status="success"
  >
    <el-step title="知晓协议"> </el-step>
    <el-step title="申报材料" />
    <el-step title="核验资料" />
    <el-step title="完成" />
  </el-steps>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
withDefaults(defineProps<{ active: number }>(), { active: 0 });
</script>
<style scoped lang="scss">
.steps {
  border-color: rgb(160, 160, 160);
}
</style>
