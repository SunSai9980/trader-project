<template>
  <div v-if="loading">
    <div :class="{ 'pb-[64px]': !useCustomBtn }">
      <el-form
        :model="materialsForm"
        ref="formRef"
        label-width="150px"
        class="max-w-1/2 ml-30 my-10"
        :rules="materialsRules"
      >
        <el-form-item prop="enterpriseName" label="企业名称">
          <el-input
            v-model="materialsForm.enterpriseName"
            placeholder="请输入企业名称"
          />
        </el-form-item>
        <el-form-item prop="name" label="负责人姓名">
          <el-input
            v-model="materialsForm.name"
            placeholder="请输入负责人姓名"
          />
        </el-form-item>
        <el-form-item prop="mobile" label="负责人手机号">
          <el-input
            v-model="materialsForm.mobile"
            placeholder="请输入负责人手机号"
          />
        </el-form-item>
        <el-form-item prop="email" label="负责人邮箱">
          <el-input
            v-model="materialsForm.email"
            placeholder="请输入负责人邮箱"
          />
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="idCardFront" label="负责人身份证">
              <entry-upload
                :fileList="fileList1"
                accept=".png,.jpg"
                @on-success="handleIdCardFrontSuccess"
                @before-upload="beforeUpload"
                @onRemove="handleIdCardFrontRemove"
              >
                <div class="flex flex-col justify-center items-center">
                  <el-icon><i-ep-plus /></el-icon>
                  <div class="text-xs text-[#8f8f8f] mt-[6px]">人像面</div>
                </div>
              </entry-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="idCardOpposite">
              <entry-upload
                :fileList="fileList2"
                accept=".png,.jpg"
                @on-success="handleIdCardOppositeSuccess"
                @before-upload="beforeUpload"
                @onRemove="handleIdCardOppositeRemove"
              >
                <div class="flex flex-col justify-center items-center">
                  <el-icon><i-ep-plus /></el-icon>
                  <div class="text-xs text-[#8f8f8f] mt-[6px]">国徽面</div>
                </div>
              </entry-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="ml-[150px] mb-6">
          <div
            class="flex items-center text-[#409EFF] cursor-pointer inline-block"
            @click="handleArrowUp1"
          >
            <span class="text-xs mr-1">查看图片要求及示例</span
            ><el-icon size="10px" v-show="iconArrowUp1"
              ><i-ep-arrow-up
            /></el-icon>
            <el-icon size="10px" v-show="!iconArrowUp1"
              ><i-ep-arrow-down
            /></el-icon>
          </div>
          <div
            class="p-[20px] bg-#fafafa mt-1 w-[450px] text-#aaaaaa"
            v-show="iconArrowUp1"
          >
            <div class="text-sm">请上传身份证照片，仅支持jpg、png格式</div>
            <div class="text-xs leading-7">1、必须是中国大陆身份证</div>
            <div class="text-xs leading-7">
              2、距离有效期截至时间应大于1个月
            </div>
            <div class="text-xs leading-7">3、证件清晰，图片上传不要倒置</div>
            <div class="text-xs text-gray-600 mt-3 mb-1">正确实例</div>
            <div class="flex">
              <div class="flex flex-col items-center mr-5">
                <el-image
                  class="h-[60px] mb-1"
                  :src="urlList[0]"
                  :preview-src-list="urlList"
                  :initial-index="0"
                />
                <span class="text-xs">人像面</span>
              </div>
              <div class="flex flex-col items-center">
                <el-image
                  class="h-[60px] mb-1"
                  :src="urlList[1]"
                  :initial-index="1"
                  :preview-src-list="urlList"
                />
                <span class="text-xs">国徽面</span>
              </div>
            </div>
          </div>
        </div>

        <el-form-item prop="businessLicense" label="企业营业执照（需加盖公章）">
          <entry-upload
            :fileList="fileList3"
            accept=".png,.jpg"
            @on-success="handleBusinessLicenseSuccess"
            @before-upload="beforeUpload"
            @onRemove="handleBusinessLicenseRemove"
          >
            <el-icon><i-ep-plus /></el-icon>
          </entry-upload>
        </el-form-item>
        <div class="ml-[150px] mb-6">
          <div
            class="flex items-center text-[#409EFF] cursor-pointer inline-block"
            @click="handleArrowUp2"
          >
            <span class="text-xs mr-1">查看图片要求及示例</span
            ><el-icon size="10px" v-show="iconArrowUp2"
              ><i-ep-arrow-up
            /></el-icon>
            <el-icon size="10px" v-show="!iconArrowUp2"
              ><i-ep-arrow-down
            /></el-icon>
          </div>
          <div
            class="p-[20px] bg-#fafafa mt-1 w-[450px] text-#aaaaaa"
            v-show="iconArrowUp2"
          >
            <div class="text-sm">
              请上传营业执照照片或复印件，复印件需加盖公司公章，仅支持jpg、png格式
            </div>
            <div class="text-xs leading-7">
              1、图片需清晰、完整、无反光、无PS、无不相关水印、非拍屏
            </div>
            <div class="text-xs leading-7">
              2、主体证照信息需与公示网信息一致
            </div>
            <div class="text-xs leading-7">3、示例图仅供样式参考</div>
            <div class="text-xs text-gray-600 mt-3 mb-1">正确实例</div>
            <div class="flex">
              <div class="flex flex-col items-center mr-5">
                <el-image
                  class="h-[60px] mb-1"
                  :src="urlList[2]"
                  :initial-index="2"
                  :preview-src-list="urlList"
                />
                <span class="text-xs">营业执照</span>
              </div>
            </div>
          </div>
        </div>
        <el-form-item prop="creditCode" label="社会统一信用代码">
          <el-input
            v-model="materialsForm.creditCode"
            maxlength="18"
            placeholder="请输入18位信用代码"
          />
        </el-form-item>
        <el-form-item
          prop="operatePermit"
          label="食品经营许可证或其他特许经营许可证书（需加盖公章）"
        >
          <entry-upload
            :fileList="fileList4"
            accept=".png,.jpg"
            :multiple="true"
            :limit="10"
            @on-success="handleOperatePermitSuccess"
            @before-upload="beforeUpload"
            @onRemove="handleOperatePermitRemove"
          >
            <el-icon><i-ep-plus /></el-icon>
          </entry-upload>
        </el-form-item>
        <div class="ml-[150px] mb-6">
          <div
            class="flex items-center text-[#409EFF] cursor-pointer inline-block"
            @click="handleArrowUp3"
          >
            <span class="text-xs mr-1">查看图片要求及示例</span
            ><el-icon size="10px" v-show="iconArrowUp3"
              ><i-ep-arrow-up
            /></el-icon>
            <el-icon size="10px" v-show="!iconArrowUp3"
              ><i-ep-arrow-down
            /></el-icon>
          </div>
          <div
            class="p-[20px] bg-#fafafa mt-1 w-[450px] text-#aaaaaa"
            v-show="iconArrowUp3"
          >
            <div class="text-sm">
              请上传食品经营许可证执照或其他特许经营许可证书照片或复印件，复印件需加盖公司公章，仅支持jpg、png格式
            </div>
            <div class="text-xs leading-7">
              1、图片需清晰、完整、无反光、无PS、无不相关水印、非拍屏
            </div>
            <div class="text-xs leading-7">2、示例图仅供样式参考</div>
            <div class="text-xs text-gray-600 mt-3 mb-1">正确实例</div>
            <div class="flex">
              <div class="flex flex-col items-center mr-5">
                <el-image
                  class="h-[60px] mb-1"
                  :src="urlList[3]"
                  :initial-index="3"
                  :preview-src-list="urlList"
                />
                <span class="text-xs">食品经营许可证</span>
              </div>
            </div>
          </div>
        </div>
        <el-form-item prop="recommendUser" label="推荐人/推荐单位">
          <el-input
            maxlength="50"
            :disabled="recommendUserDisabled"
            v-model="materialsForm.recommendUser"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item prop="commitment" label="合作服务承诺登记书">
          <el-upload
            v-model:file-list="fileList5"
            class="upload-demo"
            ref="uploadTag"
            accept=".pdf"
            :limit="1"
            :headers="{ sign: Md5.hashStr(SECRET), keys: JSON.stringify([]) }"
            :action="UPLOAD_URL"
            :before-upload="beforeUploadPdf"
            :on-success="handleCommitmentSuccess"
            :on-remove="handleCommitmentRemove"
            :on-preview="handleCommitmentPreview"
          >
            <el-button>上传文件</el-button>
          </el-upload>
        </el-form-item>
        <div
          class="ml-[150px] mb-6 p-[20px] mt-[-3px] bg-#fafafa w-[450px] text-#aaaaaa"
        >
          <div class="text-xs leading-7">
            1.请下载<span
              class="text-[#409EFF] text-xs cursor-pointer"
              @click="
                downloadFile(
                  'https://ddup-education.oss-cn-beijing.aliyuncs.com/file/%E9%98%BF%E6%8B%89%E6%95%99%E5%B8%88%E7%A0%81%E5%B9%B3%E5%8F%B0%E6%83%A0%E5%B8%88%E5%90%88%E4%BD%9C%E6%9C%8D%E5%8A%A1%E6%89%BF%E8%AF%BA%E7%99%BB%E8%AE%B0%E8%A1%A8%EF%BC%88%E5%A1%AB%E5%86%99%E8%8C%83%E4%BE%8B%EF%BC%89.xlsx',
                  '商户合作风险承诺表.xlsx'
                )
              "
              >《商户合作风险承诺表》</span
            >填写并盖章后扫描对应文件上传，要求公章完整清晰
          </div>
          <div class="text-xs leading-7">
            2.支持 pdf 格式，文件大小不超过5M;
          </div>
        </div>
        <el-form-item prop="servicePrice" label="服务金额">
          <el-input-number
            :step="1"
            :precision="2"
            v-model="materialsForm.servicePrice"
            placeholder="请输入"
          />元
        </el-form-item>
        <el-form-item prop="serviceJoinUserNum" label="服务参与人数">
          <el-input-number
            v-model="materialsForm.serviceJoinUserNum"
            placeholder="请输入"
          />人
        </el-form-item>
        <el-form-item prop="serviceRange" label="服务范围">
          <el-select
            v-model="materialsForm.serviceRange"
            placeholder="请选择服务范围"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in serviceRangeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="cooperateTime" label="合作时间">
          <el-select
            v-model="materialsForm.cooperateTime"
            placeholder="请选择合作时间"
            size="large"
            style="width: 240px"
            @change="cooperateTimeSelectChange()"
          >
            <el-option
              v-for="item in cooperateTimeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="otherTime"
          label="自定义合作时间"
          v-if="materialsForm.cooperateTime === CooperateTime.Other"
        >
          <el-input
            v-model="materialsForm.otherTime"
            style="width: 240px"
            autosize
            type="textarea"
            show-word-limit
            maxlength="100"
            placeholder="请输入合作时间"
          />
        </el-form-item>
        <el-form-item
          prop="companyProfile"
          label="企业简介(介绍业务情况、成立时间、办公地点等)"
        >
          <el-input
            v-model="materialsForm.companyProfile"
            maxlength="500"
            :autosize="{ minRows: 4 }"
            type="textarea"
            show-word-limit
            placeholder="请填写公司简介"
          />
        </el-form-item>
      </el-form>
      <div
        v-if="!useCustomBtn"
        class="mt-6 py-3 px-10 shadow flex items-center fixed bottom-0 right-[20px] left-[220px] bg-#fff"
      >
        <el-button type="primary" @click="handleSubmit(formRef)"
          >提交</el-button
        >
      </div>
      <div v-else class="flex justify-end">
        <el-button type="primary" @click="handleSubmit(formRef)"
          >确认</el-button
        >
        <slot name="cancel"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import entryUpload from "@/views/entry-process/components/entry-upload.vue";
import { Md5 } from "ts-md5";
import { CooperateTime, ServiceRange } from "@/enums";
import { SECRET } from "@/constants";
import type { ResultData } from "@/utils/http/types";
import {
  type FormInstance,
  type FormRules,
  type UploadFile,
  type UploadProps,
  type UploadUserFile,
  type UploadInstance,
} from "element-plus";
// import { useUserInfo, useInvitationInfo } from "@/store";
import {
  validatorMobile,
  validatorEmail,
  validatorCreditCode,
  downloadFile,
} from "@/utils";

import { UPLOAD_URL } from "@/constants";
import { User, InvitationInfo, Materials } from "@/types";

export interface Props {
  user: User;
  invitationInfo: InvitationInfo;
  useCustomBtn: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  invitationInfo: () => ({
    code: "",
    recommendUser: "",
  }),
  useCustomBtn: false,
});

const emits = defineEmits(["onSubmit"]);

const serviceRangeOptions = [
  {
    label: "大市范围",
    value: ServiceRange.LargeCityArea,
  },
  {
    label: "区（县、市）范围",
    value: ServiceRange.CountyScope,
  },
  {
    label: "基层范围",
    value: ServiceRange.GrassrootsScope,
  },
];

const cooperateTimeOptions = [
  {
    label: "一个月",
    value: CooperateTime.OneMonth,
  },
  {
    label: "三个月",
    value: CooperateTime.ThreeMonths,
  },
  {
    label: "六个月",
    value: CooperateTime.moreThanThreeMonths,
  },
  {
    label: "长期合作",
    value: CooperateTime.LongCooperation,
  },
  {
    label: "其他",
    value: CooperateTime.Other,
  },
];

const loading = ref(false);
const urlList = reactive<string[]>([
  "https://ddup-education.oss-cn-beijing.aliyuncs.com/20240319/84222f2119084f15bb8698d6c5a077ce.png",
  "https://ddup-education.oss-cn-beijing.aliyuncs.com/20240319/d3d31a37cca747b78e9634cdb4dc3651.png",
  "https://ddup-education.oss-cn-beijing.aliyuncs.com/20240319/f4069c9dc7804d7eb4a2ff2a5214f0a1.png",
  "https://ddup-education.oss-cn-beijing.aliyuncs.com/20240319/6cee3b3aa8974a5793f3e7d884473393.png",
]);
// const emits = defineEmits(["stepNext"]);
// let user = useUserInfo();
// let invitationInfo = useInvitationInfo();
const iconArrowUp1 = ref(true);
const handleArrowUp1 = () => {
  iconArrowUp1.value = !iconArrowUp1.value;
};
const iconArrowUp2 = ref(true);
const handleArrowUp2 = () => {
  iconArrowUp2.value = !iconArrowUp2.value;
};
const iconArrowUp3 = ref(false);
const handleArrowUp3 = () => {
  iconArrowUp3.value = !iconArrowUp3.value;
};
const formRef = ref<FormInstance>();
const uploadTag = ref<UploadInstance>();
const fileList1 = ref<UploadUserFile[]>([]);
const fileList2 = ref<UploadUserFile[]>([]);
const fileList3 = ref<UploadUserFile[]>([]);
const fileList4 = ref<UploadUserFile[]>([]);
const fileList5 = ref<UploadUserFile[]>([]);
const materialsForm = reactive<Materials>({
  id: props.user.id,
  name: props.user.name!,
  enterpriseName: props.user.enterpriseName!,
  mobile: props.user.mobile! || props.user.loginMobile!,
  email: props.user.email!,
  idCardFront: props.user.idCardFront!,
  idCardOpposite: props.user.idCardOpposite!,
  businessLicense: props.user.businessLicense!,
  creditCode: props.user.creditCode!,
  operatePermit: props.user.operatePermit! || [],
  recommendUser:
    props.user.recommendUser! || props.invitationInfo.recommendUser,
  commitment: props.user.commitment!,
  servicePrice: props.user.servicePrice!,
  serviceJoinUserNum: props.user.serviceJoinUserNum!,
  serviceRange: props.user.serviceRange!,
  cooperateTime: props.user.cooperateTime!,
  companyProfile: props.user.companyProfile || "",
  otherTime: props.user.otherTime || "",
});

const materialsRules = reactive<FormRules<Materials>>({
  name: [
    {
      required: true,
      message: "请填写负责人姓名",
      trigger: "blur",
    },
  ],
  enterpriseName: [
    {
      required: true,
      message: "请填写企业名称",
      trigger: "blur",
    },
  ],
  mobile: [
    { required: true, message: "请填写负责人手机号", trigger: "blur" },
    {
      validator: validatorMobile,
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "请填写邮箱", trigger: "blur" },
    {
      validator: validatorEmail,
      trigger: "blur",
    },
  ],
  idCardFront: [
    {
      required: true,
      message: "请上传身份证正面照片",
      trigger: "blur",
    },
  ],
  idCardOpposite: [
    {
      required: true,
      message: "请上传身份证反面照片",
      trigger: "blur",
    },
  ],
  businessLicense: [
    {
      required: true,
      message: "请填写上传营业执照",
      trigger: "blur",
    },
  ],
  creditCode: [
    {
      required: true,
      validator: validatorCreditCode,
      trigger: "blur",
    },
  ],
  servicePrice: [
    {
      required: true,
      message: "请输入服务金额",
      trigger: "blur",
    },
  ],
  serviceJoinUserNum: [
    {
      required: true,
      message: "请输入服务参与人数",
      trigger: "blur",
    },
  ],
  serviceRange: [
    {
      required: true,
      message: "请选择服务范围",
      trigger: "blur",
    },
  ],
  cooperateTime: [
    {
      required: true,
      message: "请选择合作时间",
      trigger: "blur",
    },
  ],
  commitment: [
    {
      required: true,
      message: "请上传承诺书",
      trigger: "blur",
    },
  ],
  otherTime: [
    {
      required: true,
      message: "请输入合作时间",
    },
  ],
  companyProfile: [
    {
      required: true,
      message: "请填写公司简介",
      trigger: "blur",
    },
  ],
});

const cooperateTimeSelectChange = () => {
  materialsForm.otherTime = "";
};

const beforeUpload = (file: UploadFile) => {
  const fileName = file.name;
  const fileType = fileName.substring(fileName.lastIndexOf("."));
  if (fileType === ".jpg" || fileType === ".png") {
    return true;
  } else {
    ElMessage.error("不是,.png,.jpg文件,请上传正确的图片类型");
    return false;
  }
};
const beforeUploadPdf: UploadProps["beforeUpload"] = (file) => {
  const fileName = file.name;
  const fileType = fileName.substring(fileName.lastIndexOf("."));
  if (fileType === ".pdf") {
    if (file.size! > 1024 * 1024 * 5) {
      ElMessage.error("pdf文件大小超过5M");
      return false;
    }
    return true;
  } else {
    ElMessage.error("不是,pdf文件,请上传正确的图片类型");
    return false;
  }
};
const handleIdCardFrontSuccess: UploadProps["onSuccess"] = (response) => {
  materialsForm.idCardFront = response.message;
};
const handleIdCardOppositeSuccess: UploadProps["onSuccess"] = (response) => {
  materialsForm.idCardOpposite = response.message;
};
const handleCommitmentSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFiles
) => {
  if (response.code === 200) {
    materialsForm.commitment = JSON.stringify([
      { name: uploadFiles.name, url: response.message },
    ]);
    ElMessage.success("上传成功");
  } else {
    uploadTag.value?.handleRemove(uploadFiles);
    ElMessage.error("上传失败, 请重新上传");
  }
};
const handleCommitmentPreview: UploadProps["onPreview"] = (
  uploadFile: UploadFile
) => {
  if (uploadFile.response) {
    downloadFile((uploadFile.response as ResultData).message, uploadFile.name);
  } else {
    downloadFile(uploadFile.url!, uploadFile.name);
  }
};
const handleOperatePermitSuccess: UploadProps["onSuccess"] = (response) => {
  if (Array.isArray(materialsForm.operatePermit)) {
    materialsForm.operatePermit.push(response);
  } else {
    try {
      materialsForm.operatePermit = JSON.parse(materialsForm.operatePermit);
      if (Array.isArray(materialsForm.operatePermit)) {
        materialsForm.operatePermit.push(response);
      }
    } catch (e) {
      console.log(e);
    }
  }
};
const handleBusinessLicenseSuccess: UploadProps["onSuccess"] = (response) => {
  materialsForm.businessLicense = response.message;
};
const handleBusinessLicenseRemove: UploadProps["onRemove"] = (
  _uploadFile,
  _uploadFiles
) => {
  materialsForm.businessLicense = "";
};
const handleIdCardFrontRemove: UploadProps["onRemove"] = (
  _uploadFile,
  _uploadFiles
) => {
  materialsForm.idCardFront = "";
};
const handleIdCardOppositeRemove: UploadProps["onRemove"] = (
  _uploadFile,
  _uploadFiles
) => {
  materialsForm.idCardOpposite = "";
};
const handleCommitmentRemove: UploadProps["onRemove"] = (
  _uploadFile,
  _uploadFiles
) => {
  materialsForm.commitment = "";
};
const handleOperatePermitRemove: UploadProps["onRemove"] = (
  _uploadFile,
  uploadFiles
) => {
  materialsForm.operatePermit = uploadFiles.map((it) => ({
    name: it.name,
    url: (it.response as { message: string }).message!,
  }));
};

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      ElMessageBox.alert("请认真核对材料，是否确认提交？", "确认", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        showCancelButton: true,
      })
        .then(async () => {
          try {
            if (typeof materialsForm.operatePermit !== "string") {
              materialsForm.operatePermit = JSON.stringify(
                materialsForm.operatePermit
              );
            }
            emits("onSubmit", materialsForm);
          } catch (e) {
            console.error(e);
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消",
          });
        });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const recommendUserDisabled = ref(false);
onMounted(() => {
  if (props.user.idCardFront) {
    fileList1.value = [
      {
        name: "1.png",
        url: props.user.idCardFront,
      },
    ];
  }
  if (props.user.idCardOpposite) {
    fileList2.value = [
      {
        name: "2.png",
        url: props.user.idCardOpposite,
      },
    ];
  }
  if (props.user.businessLicense) {
    fileList3.value = [
      {
        name: "3.png",
        url: props.user.businessLicense,
      },
    ];
  }
  if (props.user.commitment) {
    try {
      fileList5.value = JSON.parse(props.user.commitment);
    } catch (_e) {
      fileList5.value = [
        {
          name: "承诺书",
          url: props.user.commitment,
        },
      ];
    }
  }
  if (props.user.operatePermit) {
    try {
      fileList4.value = JSON.parse(props.user.operatePermit);
    } catch (_e) {
      fileList3.value = [
        {
          name: "4.png",
          url: props.user.operatePermit,
        },
      ];
    }
  }
  recommendUserDisabled.value = Boolean(
    props.user.recommendUser! || props.invitationInfo.recommendUser
  );
  loading.value = true;
});
</script>

<style scoped lang="scss">
.shadow {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
}
::v-deep(.el-form-item__error) {
  min-width: 120px;
}
:deep(label) {
  font-weight: 400;
}
</style>
@/constants
