<template>
  <el-upload
    v-model:file-list="fileList"
    accept=".png,.jpg"
    :limit="limit"
    :on-preview="handlePictureCardPreview"
    :action="action"
    :before-upload="beforeUpload"
    :on-success="handleIdCardFrontSuccess"
    list-type="picture-card"
    :class="{ hid: hideUploadEdit }"
    :on-remove="handleRemove"
    :on-change="handleChange"
  >
    <slot></slot>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UploadUserFile, UploadFile, UploadProps } from "element-plus";

interface EntryUploadProps {
  limit?: number;
  accept?: string;
  fileList: UploadUserFile[];
  action?: string;
}

const props = withDefaults(defineProps<EntryUploadProps>(), {
  limit: 1,
  action: import.meta.env.VITE_API_URL + "/sys/oss/upload",
});
const emits = defineEmits(["onSuccess", "beforeUpload", "onRemove"]);

const fileList = ref<UploadUserFile[]>(props.fileList);
const dialogImageUrl = ref<string>("");
const dialogVisible = ref<boolean>(false);
const hideUploadEdit = ref<boolean>(props.fileList.length > 0);

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
const beforeUpload = (file: UploadFile) => {
  emits("beforeUpload", file);
};
const handleIdCardFrontSuccess: UploadProps["onSuccess"] = (response) => {
  emits("onSuccess", response);
};
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  hideUploadEdit.value = uploadFiles.length > 0;
  emits("onRemove", uploadFile, uploadFiles);
};
const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  hideUploadEdit.value = uploadFiles.length > 0;
};
</script>

<style scoped lang="scss">
.hid :deep(.el-upload--picture-card) {
  display: none;
}
</style>
