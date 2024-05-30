<template>
  <div class="mt-5 pb-15">
    <div class="mb-5 flex justify-between items-center px-8">
      <span class="text-lg font-semibold">详情</span>
      <el-button @click="$emit('goList')">返回上一页</el-button>
    </div>
    <el-divider />
    <div class="px-8">
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
            <el-col
              :span="14"
              class="text-sm !flex items-center p-3 text-#5a5a5a"
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
              >{{
                detailInfo?.type === 1 ? "单商户发放" : "多商户发放"
              }}</el-col
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
        <el-col
          :span="20"
          class="text-sm !flex items-center p-3 text-#5a5a5a"
          >{{ detailInfo?.content }}</el-col
        >
      </el-row>
    </div>
    <el-divider
      class="border-2 border-[#f0f2f5]"
      v-if="notSubmitted || tableData.length"
    />
    <el-form
      v-if="notSubmitted"
      ref="ruleFormRef"
      class="m-auto mt-5 w-160"
      :model="detailsForm"
      label-width="auto"
      :rules="rules"
    >
      <el-form-item label="联系电话" prop="mobile">
        <el-input v-model="detailsForm.mobile" />
      </el-form-item>
      <div class="flex">
        <el-form-item label="单人订单金额（元）" prop="orderPrice" class="mr-3">
          <el-input-number
            v-model="detailsForm.orderPrice"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="膨胀率（%）" prop="expansionRate" label-width="80">
          <el-input-number
            disabled
            v-model="expansionRate"
            controls-position="right"
          />
        </el-form-item>
      </div>

      <el-form-item label="报价表" prop="annex">
        <el-upload
          ref="UploadTag"
          :action="UPLOAD_URL"
          :headers="{ sign: Md5.hashStr(SECRET), keys: JSON.stringify([]) }"
          v-model:file-list="fileList"
          class="upload-demo"
          multiple
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <el-button type="primary">上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品来源证明文件或质量检测证明" prop="inspection">
        <el-upload
          ref="UploadTag"
          :action="UPLOAD_URL"
          :headers="{ sign: Md5.hashStr(SECRET), keys: JSON.stringify([]) }"
          v-model:file-list="fileList1"
          class="upload-demo"
          multiple
          :on-remove="handleRemoveWord"
          :on-success="handleSuccessWord"
        >
          <el-button type="primary">上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="快递范围" prop="deliveryArea">
        <el-select
          v-model="detailsForm.deliveryArea"
          placeholder="请选择快递范围"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in courierRange"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="detailsForm.remark"
          :autosize="{ minRows: 4 }"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <div
      v-if="notSubmitted"
      class="mt-6 py-3 px-10 shadow flex items-center fixed bottom-0 right-[20px] left-[220px] bg-#fff"
    >
      <el-button type="primary" @click="handleConfirm(ruleFormRef)"
        >提交</el-button
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-else-if="tableData.length"
      table-layout="auto"
    >
      <el-table-column prop="supplierName" label="供应商" width="150" />
      <el-table-column prop="createTime" label="提交时间" width="180" />
      <el-table-column prop="mobile" label="联系电话" />
      <el-table-column
        prop="orderPrice"
        label="单人订单金额（元）"
        width="160"
      />
      <el-table-column label="膨胀率">
        <template #default="scope">{{ getExpansionRate(scope.row) }}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default>回应</template>
      </el-table-column>
      <el-table-column label="快递范围" prop="deliveryArea">
        <template #default="scope">
          {{ courierLabel(scope.row.deliveryArea) }}
        </template>
      </el-table-column>
      <el-table-column prop="annex" label="报价表" width="180">
        <template #default="scope">
          <div class="flex flex-col">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="item.name"
              placement="top-start"
              v-for="(item, index) in scope.row.annex"
              :key="index"
            >
              <div
                class="text-[#409EFF] text-xs cursor-pointer inline-block w-[150px] text-ellipsis-2 item"
                @click="downloadFile(item.url, item.name)"
              >
                {{ item.name }}
              </div>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="inspection"
        label="产品来源证明文件或质量检测证明"
        width="180"
      >
        <template #default="scope">
          <div class="flex flex-col" v-if="scope.row.inspection?.length">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="item.name"
              placement="top-start"
              v-for="(item, index) in scope.row.inspection"
              :key="index"
            >
              <div
                class="text-[#409EFF] text-xs cursor-pointer inline-block item w-[150px] text-ellipsis-2"
                @click="downloadFile(item.url, item.name)"
              >
                {{ item.name }}
              </div>
            </el-tooltip>
          </div>
          <div v-else>-</div>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180">
        <template #default="scope">
          {{ scope.row.remark || "-" }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import type {
  FormData,
  SupplierWebList,
  SupplierWelfareItem,
  SupplierListItem,
} from "@/types/union-inquiry";
import { UPLOAD_URL, SECRET } from "@/constants";
import {
  type FormInstance,
  type FormRules,
  type UploadProps,
  type UploadInstance,
  type UploadFile,
} from "element-plus";
import dayjs from "dayjs";
import { validatorMobile, downloadFile } from "@/utils";
import { apiSupplierCreate, apiWelfareSupplierGet } from "@/api/union-inquiry";
import { useUserInfo } from "@/store";
import { Md5 } from "ts-md5";
import Big from "big.js";
import { CourierRange } from "@/enums";

const ruleFormRef = ref<FormInstance>();
const user = useUserInfo();
const props = defineProps<{ detailInfo?: SupplierWelfareItem }>();
const emits = defineEmits(["goDetail", "goList"]);
const tableData = ref<SupplierWebList[]>([]);
const fileList = ref([]);
const fileList1 = ref([]);
const UploadTag = ref<UploadInstance>();

const detailsForm = reactive<FormData>({
  mobile: "",
  annex: [],
  orderPrice: 0,
  inspection: [],
  remark: "",
  deliveryArea: undefined,
});
const expansionRate = computed(() => {
  if (
    detailsForm.orderPrice &&
    props.detailInfo &&
    props.detailInfo.unitPrice
  ) {
    const price = new Big(detailsForm.orderPrice);
    const unitPrice = new Big(props.detailInfo.unitPrice);
    return parseFloat(price.div(unitPrice).round(2).times(100) + "");
  }
  return 0;
});
const getExpansionRate = (data: SupplierListItem) => {
  if (props.detailInfo && props.detailInfo.unitPrice && data.orderPrice) {
    return (
      new Big(data.orderPrice)
        .div(new Big(props.detailInfo.unitPrice))
        .round(2)
        .times(100) + "%"
    );
  }
  return 0;
};
const notSubmitted = computed(() => {
  return (
    !tableData.value.length &&
    props.detailInfo &&
    dayjs(props.detailInfo.askEndTime).valueOf() > dayjs().valueOf()
  );
});
const validatorAnnex = (rule: any, value: any, callback: any) => {
  if (value.length > 0) {
    callback();
  } else {
    callback(new Error(rule.message));
  }
};
const courierRange: { label: string; value: CourierRange }[] = [
  { label: "宁波大市内包邮", value: CourierRange.NBFreeShipping },
  { label: "浙江省内包邮", value: CourierRange.ZJFreeShipping },
  { label: "江浙沪包邮", value: CourierRange.JZHFreeShipping },
  { label: "全国包邮", value: CourierRange.FreeShipping },
  { label: "统一配送到校", value: CourierRange.DeliveryToSchool },
];
const courierLabel = (type: CourierRange) => {
  switch (type) {
    case CourierRange.NBFreeShipping:
      return "宁波大市内包邮";
    case CourierRange.ZJFreeShipping:
      return "浙江省内包邮";
    case CourierRange.JZHFreeShipping:
      return "江浙沪包邮";
    case CourierRange.FreeShipping:
      return "全国包邮";
    case CourierRange.DeliveryToSchool:
      return "统一配送到校";
    default:
      return "-";
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
      message: "请上传报价表",
      trigger: "blur",
    },
  ],
  orderPrice: [
    {
      required: true,
      message: "请填写单人订单金额",
      trigger: "blur",
    },
  ],
  deliveryArea: [
    {
      required: true,
      message: "请选择快递范围",
      trigger: "blur",
    },
  ],
});
let pol = true;
const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (pol) {
        ElMessageBox.confirm(
          "询价应答内容一经提交不可修改，是否确定提交？",
          "",
          {
            confirmButtonText: "确 认",
            cancelButtonText: "取 消",
            type: "warning",
          }
        )
          .then(async () => {
            try {
              pol = false;
              await apiSupplierCreate({
                annex: JSON.stringify(detailsForm.annex),
                mobile: detailsForm.mobile,
                selected: 0,
                orderPrice: detailsForm.orderPrice,
                inspection: detailsForm.inspection
                  ? JSON.stringify(detailsForm.inspection)
                  : undefined,
                remark: detailsForm.remark,
                loginMobile: user.loginMobile!,
                sunlightWelfareId: props.detailInfo?.id!,
                deliveryArea: detailsForm.deliveryArea!,
              });
              ElMessage.success("提交成功");
              setTimeout(() => {
                emits("goList");
              }, 1000);
            } catch (e) {
            } finally {
              pol = true;
            }
          })
          .catch(() => {
            pol = true;
          });
      }
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
const handleRemoveWord: UploadProps["onRemove"] = (
  file: UploadFile,
  _uploadFiles
) => {
  detailsForm.inspection = detailsForm.inspection.filter(
    (f) => f.url !== (file.response as { message: string }).message
  );
};
const handleSuccessWord: UploadProps["onSuccess"] = (response, uploadFiles) => {
  if (response.code === 200) {
    detailsForm.inspection.push({
      url: response.message,
      name: uploadFiles.name,
    });
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
    const inspection = list[0].inspection ? JSON.parse(list[0].inspection) : [];
    tableData.value.push({ ...list[0], annex, inspection });
  }
});
</script>

<style scoped lang="scss">
:deep(label) {
  font-weight: 400;
}
.shadow {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
}
.item {
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
@/constants
