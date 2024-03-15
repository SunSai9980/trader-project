<template>
  <el-steps style="max-width: 600px" :active="active" align-center>
    <el-step title="知晓协议">
      <template #icon>
        <div class="one" :class="{ green: active === 1 }"></div>
      </template>
    </el-step>
    <el-step title="Step 2" />
    <el-step title="Step 3" />
    <el-step title="Step 4" />
  </el-steps>

  <el-button style="margin-top: 12px" @click="next">Next step</el-button>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const active = ref(0);

const next = () => {
  if (active.value++ > 2) active.value = 0;
};
</script>
<style scoped lang="scss">
.one {
  width: 6px;
  height: 6px;
  background-color: gray;
  border-radius: 50%;
}
.green {
  background-color: red;
}
</style>
