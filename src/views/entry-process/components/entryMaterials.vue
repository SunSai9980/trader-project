<template>
  <el-form :model="materialsForm" ref="formRef">
    <el-form-item label=" 企业名称" prop="name">
      <el-input v-model="materialsForm.name" />
    </el-form-item>
    <el-form-item label="负责人姓名" prop="name">
      <el-input v-model="materialsForm.name" />
    </el-form-item>
    <el-form-item label="负责人手机号" prop="name">
      <el-input v-model="materialsForm.name" />
    </el-form-item>
    <el-form-item label="负责人邮箱" prop="name">
      <el-input v-model="materialsForm.name" />
    </el-form-item>
    <el-form-item label="负责人身份证" prop="name">
      <el-upload
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="1"
        :on-exceed="handleExceed"
      >
      </el-upload>
    </el-form-item>
    <el-form-item prop="name">
      <el-upload
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="1"
        :on-exceed="handleExceed"
      >
      </el-upload>
    </el-form-item>
    <el-form-item label="社会统一信用代码" prop="name">
      <el-input v-model="materialsForm.name" />
    </el-form-item>
    <el-form-item label="推荐人/推荐单位" prop="name">
      <el-input v-model="materialsForm.name" />
    </el-form-item>
    <el-form-item label="阳光福利商户承诺书" prop="name">
      <el-upload
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="1"
        :on-exceed="handleExceed"
      >
        <el-button type="primary">Click to upload</el-button>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500KB.
          </div>
        </template>
      </el-upload>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance, UploadProps } from "element-plus";
import { ElMessage } from "element-plus";

const formRef = ref<FormInstance>();
const materialsForm = reactive({
  name: "",
});

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return true;
};
</script>

<style scoped></style>
