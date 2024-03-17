<template>
  <el-form :model="materialsForm" ref="formRef">
    <el-form-item prop="name" label="企业名称">
      <el-input v-model="materialsForm.name" />
    </el-form-item>
    <el-form-item prop="" label="负责人姓名">
      <el-input />
    </el-form-item>
    <el-form-item prop="" label="负责人手机号">
      <el-input />
    </el-form-item>
    <el-form-item prop="" label="负责人邮箱">
      <el-input />
    </el-form-item>
    <el-form-item prop="" label="负责人身份证">
      <el-input />
    </el-form-item>
    <el-form-item prop="" label="企业营业执照（需加盖公章）">
      <el-input />
    </el-form-item>
    <el-form-item prop="" label="社会统一信用代码">
      <el-input />
    </el-form-item>
    <el-form-item prop="" label="食品经营许可证（需加盖公章）">
      <el-input />
    </el-form-item>
    <el-form-item prop="" label="推荐人/推荐单位">
      <el-input />
    </el-form-item>
    <el-form-item prop="" label="阳光福利商户承诺书">
      <el-input />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance } from "element-plus";

interface Materials {
  name: string;
}

const formRef = ref<FormInstance>();
const materialsForm = reactive({
  name: "",
});
</script>

<style scoped></style>
