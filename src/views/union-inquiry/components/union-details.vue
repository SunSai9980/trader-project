<template>
  <div class="mt-5">
    <div class="text-lg mb-5">详情</div>
    <el-row class="border-y border-y-#e9e9e9 min-h-[51px]">
      <el-col :span="8">
        <el-row class="h-full">
          <el-col :span="10" class="bg-#fafafa !flex items-center p-3"
            >询价单位</el-col
          >
          <el-col
            :span="14"
            class="text-sm !flex items-center p-3 text-#5a5a5a"
            >{{ detailInfo?.orgName }}</el-col
          >
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row class="h-full">
          <el-col :span="10" class="bg-#fafafa !flex items-center p-3"
            >创建时间</el-col
          >
          <el-col
            :span="14"
            class="text-sm !flex items-center p-3 text-#5a5a5a"
            >{{ detailInfo?.createTime }}</el-col
          >
        </el-row></el-col
      >
      <el-col :span="8">
        <el-row class="h-full">
          <el-col :span="10" class="bg-#fafafa !flex items-center p-3"
            >询价截止时间</el-col
          >
          <el-col
            :span="14"
            class="text-sm !flex items-center p-3 text-#5a5a5a"
            >{{ detailInfo?.askEndTime }}</el-col
          >
        </el-row></el-col
      >
    </el-row>
    <el-row class="border-y border-y-#e9e9e9 min-h-[51px]">
      <el-col :span="8">
        <el-row class="h-full">
          <el-col :span="10" class="bg-#fafafa !flex items-center p-3"
            >计划名称</el-col
          >
          <el-col
            :span="14"
            class="text-sm !flex items-center p-3 text-#5a5a5a break-all"
            >{{ detailInfo?.welfareName }}</el-col
          >
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row class="h-full">
          <el-col :span="10" class="bg-#fafafa !flex items-center p-3"
            >领取时间</el-col
          >
          <el-col :span="14" class="text-sm !flex items-center p-3 text-#5a5a5a"
            >{{ detailInfo?.receiveStartTime }} -
            {{ detailInfo?.receiveEndTime }}</el-col
          >
        </el-row></el-col
      >
      <el-col :span="8">
        <el-row class="h-full">
          <el-col :span="10" class="bg-#fafafa !flex items-center p-3"
            >发放类型</el-col
          >
          <el-col
            :span="14"
            class="text-sm !flex items-center p-3 text-#5a5a5a"
            >{{ detailInfo?.type === 1 ? "单商户发放" : "多商户发放" }}</el-col
          >
        </el-row></el-col
      >
    </el-row>
    <el-row class="border-y border-y-#e9e9e9 min-h-[51px]">
      <el-col :span="8">
        <el-row class="h-full">
          <el-col :span="10" class="bg-#fafafa !flex items-center p-3"
            >单人福利金额(元)</el-col
          >
          <el-col
            :span="14"
            class="text-sm !flex items-center p-3 text-#5a5a5a"
            >{{ detailInfo?.unitPrice }}</el-col
          >
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row class="h-full">
          <el-col :span="10" class="bg-#fafafa !flex items-center p-3"
            >福利发放人数（人）</el-col
          >
          <el-col
            :span="14"
            class="text-sm !flex items-center p-3 text-#5a5a5a"
            >{{ detailInfo?.userNum }}</el-col
          >
        </el-row></el-col
      >
      <el-col :span="8">
        <el-row class="h-full">
          <el-col :span="10" class="bg-#fafafa !flex items-center p-3"
            >金额总计（元）</el-col
          >
          <el-col
            :span="14"
            class="text-sm !flex items-center p-3 text-#5a5a5a"
            >{{ detailInfo!.userNum * detailInfo!.unitPrice }}</el-col
          >
        </el-row></el-col
      >
    </el-row>
    <el-row class="border-y border-y-#e9e9e9 min-h-[51px]">
      <el-col
        :span="4"
        class="bg-#fafafa !flex items-center p-3 !flex-[0_0_14%]"
        >具体要求</el-col
      >
      <el-col :span="20" class="text-sm !flex items-center p-3 text-#5a5a5a">{{
        detailInfo?.content
      }}</el-col>
    </el-row>
    <div class="mt-24 text-right">
      <el-button @click="$emit('goList')">返回上一页</el-button>
      <el-button
        type="primary"
        v-if="
          !tableData.length &&
          dayjs(detailInfo?.askEndTime).valueOf() > dayjs().valueOf()
        "
        @click="dialogTableVisible = true"
        >上传报价</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%" v-if="tableData?.length">
      <el-table-column prop="supplierName" label="供应商" width="180" />
      <el-table-column prop="createTime" label="提交时间" width="180" />
      <el-table-column prop="mobile" label="联系电话" />
      <el-table-column prop="createTime" label="状态" width="180">
        <template #default>回应</template>
      </el-table-column>
      <el-table-column prop="state" label="附件">
        <template #default="scope">
          <div class="flex flex-col">
            <span
              class="text-[#409EFF] text-xs cursor-pointer inline-block mb-2"
              v-for="(item, index) in scope.row.annex"
              @click="downloadFile(item.url, item.name)"
              :key="index"
              >{{ item.name }}</span
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogTableVisible" title="上传报价">
    <el-divider class="!m0" />
    <el-form
      ref="ruleFormRef"
      class="m-auto mt-5"
      style="max-width: 350px"
      :model="detailsForm"
      label-width="auto"
      :rules="rules"
    >
      <el-form-item label="联系电话" prop="mobile">
        <el-input v-model="detailsForm.mobile" />
      </el-form-item>
      <el-form-item label="附件" prop="annex">
        <el-upload
          ref="UploadTag"
          :action="UPLOAD_URL"
          v-model:file-list="fileList"
          class="upload-demo"
          multiple
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <el-button type="primary">上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm(ruleFormRef)">
          确 定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type {
  FormData,
  SupplierWebList,
  SupplierWelfareItem,
} from "@/types/union-inquiry";
import { UPLOAD_URL } from "@/constant";
import dayjs from "dayjs";
import type {
  FormInstance,
  FormRules,
  UploadProps,
  UploadInstance,
  UploadFile,
} from "element-plus";
import { validatorMobile, downloadFile } from "@/utils";
import { apiSupplierCreate, apiWelfareSupplierGet } from "@/api/union-inquiry";
import { useUserInfo } from "@/store";

const ruleFormRef = ref<FormInstance>();
const user = useUserInfo();
const props = defineProps<{ detailInfo?: SupplierWelfareItem }>();
const emits = defineEmits(["goDetail", "goList"]);
const tableData = ref<SupplierWebList[]>([]);
const dialogTableVisible = ref(false);
const fileList = ref([]);
const UploadTag = ref<UploadInstance>();

const detailsForm = reactive<FormData>({
  mobile: "",
  annex: [],
});
const validatorAnnex = (_rule: any, value: any, callback: any) => {
  if (value.length > 0) {
    callback();
  } else {
    callback(new Error("请上传附件"));
  }
};
const rules = reactive<FormRules<FormData>>({
  mobile: [
    { required: true, message: "请填写联系电话", trigger: "blur" },
    {
      validator: validatorMobile,
      trigger: "blur",
    },
  ],
  annex: [
    {
      required: true,
      validator: validatorAnnex,
      message: "请上传附件",
      trigger: "blur",
    },
  ],
});
const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      apiSupplierCreate({
        annex: JSON.stringify(detailsForm.annex),
        mobile: detailsForm.mobile,
        loginMobile: user.loginMobile!,
        sunlightWelfareId: props.detailInfo?.id!,
      });
      ElMessage.success("提交成功");
      setTimeout(() => {
        dialogTableVisible.value = false;
        emits("goList");
      }, 2000);
    } else {
      console.log("error submit!", fields);
    }
  });
};

const handleRemove: UploadProps["onRemove"] = (
  file: UploadFile,
  _uploadFiles
) => {
  detailsForm.annex = detailsForm.annex.filter(
    (f) => f.url !== (file.response as { message: string }).message
  );
};
const handleSuccess: UploadProps["onSuccess"] = (response, uploadFiles) => {
  if (response.code === 200) {
    detailsForm.annex.push({ url: response.message, name: uploadFiles.name });
    ElMessage.success("上传成功");
  } else {
    UploadTag.value!.handleRemove(uploadFiles);
    ElMessage.error("上传失败, 请重新上传");
  }
};
onMounted(async () => {
  const {
    data: { list, total },
  } = await apiWelfareSupplierGet({
    deleted: false,
    pageIndex: 1,
    pageSize: 10,
    supplierMobile: user.loginMobile!,
    sunlightWelfareId: props.detailInfo?.id!,
  });
  if (total > 0) {
    const annex = JSON.parse(list[0].annex);
    tableData.value.push({ ...list[0], annex });
  }
});
</script>

<style scoped lang="scss">
:deep(label) {
  font-weight: 400;
}
</style>
