<template>
  <el-upload
    v-model:file-list="fileList"
    accept=".png,.jpg"
    ref="uploadTag"
    :multiple="multiple"
    :limit="limit"
    :on-preview="handlePictureCardPreview"
    :action="action"
    :headers="{ sign: Md5.hashStr(SECRET), keys: JSON.stringify([]) }"
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
import { UPLOAD_URL } from "@/constants";
import { Md5 } from "ts-md5";
import type {
  UploadUserFile,
  UploadFile,
  UploadProps,
  UploadInstance,
} from "element-plus";
import { SECRET } from "@/constants";

interface EntryUploadProps {
  limit?: number;
  accept?: string;
  fileList: UploadUserFile[];
  action?: string;
  multiple?: boolean;
}

const props = withDefaults(defineProps<EntryUploadProps>(), {
  limit: 1,
  action: UPLOAD_URL,
  multiple: false,
});
const emits = defineEmits(["onSuccess", "beforeUpload", "onRemove"]);

const fileList = ref<UploadUserFile[]>(props.fileList);
const dialogImageUrl = ref<string>("");
const dialogVisible = ref<boolean>(false);
const hideUploadEdit = ref<boolean>(props.fileList.length === props.limit);
const uploadTag = ref<UploadInstance>();

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  emits("beforeUpload", file);
};
const handleIdCardFrontSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFiles
) => {
  if (response.code == 200) {
    if (props.multiple) {
      emits("onSuccess", { name: uploadFiles.name, url: response.message });
    } else {
      emits("onSuccess", response);
    }
    ElMessage.success("上传成功");
  } else {
    uploadTag.value!.handleRemove(uploadFiles);
    ElMessage.error("上传失败, 请重新上传");
  }
};
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  hideUploadEdit.value = uploadFiles.length === props.limit;
  emits("onRemove", uploadFile, uploadFiles);
};
const handleChange: UploadProps["onChange"] = (_uploadFile, uploadFiles) => {
  hideUploadEdit.value = uploadFiles.length === props.limit;
};
</script>

<style scoped lang="scss">
.hid :deep(.el-upload--picture-card) {
  display: none;
}
</style>
@/constants
