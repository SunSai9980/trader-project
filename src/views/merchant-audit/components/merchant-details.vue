<template>
  <div>
    <div class="px-5 py-2 font-semibold text-lg">流程进度</div>
    <el-divider class="!mt-0" />
    <EntryAgreement :active="active" class="border-none !pt-0" />
    <div class="bg-#f0f2f5"></div>
    <!-- 审核按钮 -->
    <div class="bg-#fff pb-1">
      <div class="px-5 py-2 flex w-full items-center">
        <span class="text-base font-bold mr-3">详情</span>
        <div class="flex flex-1 justify-between items-center">
          <div class="flex">
            <el-tag type="success" v-if="detailInfo?.state! === State.successes"
              >核验通过</el-tag
            >
            <el-tag type="danger" v-else-if="detailInfo?.state! === State.error"
              >核验失败</el-tag
            >
            <el-tag
              type="success"
              v-else-if="detailInfo?.state! === State.ShortlistingSuccess"
              >合作成功</el-tag
            >
            <el-tag
              type="danger"
              v-else-if="detailInfo?.state! === State.ShortlistingError"
              >合作失败</el-tag
            >
          </div>
          <div>
            <el-button @click="$emit('goList')">回到上一页</el-button>
            <el-button
              v-if="showCooperateTypeBtn"
              @click="dialogVisibleRiskType = true"
              >修改风险类型</el-button
            >
            <el-button
              type="primary"
              v-if="detailInfo?.state! === State.declare"
              @click="dialogVisibleExamine = true"
              >通过</el-button
            >
            <el-button
              type="danger"
              plain
              v-if="detailInfo?.state! === State.declare"
              @click="dialogVisible = true"
              >驳回</el-button
            >
            <el-button
              type="primary"
              v-if="detailInfo?.state! === State.successes"
              @click="dialogVisibleEntryAudit = true"
              >合作处理</el-button
            >
          </div>
        </div>
      </div>
      <el-divider class="!mt-0" />
      <!-- 企业信息 -->
      <!-- start -->
      <div class="px-5 pb-5">
        <el-descriptions
          title="企业信息"
          direction="vertical"
          :column="9"
          size="default"
          border
        >
          <el-descriptions-item label="企业名称">{{
            detailInfo!.enterpriseName
          }}</el-descriptions-item>
          <el-descriptions-item label="合作类型">{{
            cooperateLabel
          }}</el-descriptions-item>
          <el-descriptions-item label="商户合作风险承诺表">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="item.name"
              placement="top-start"
              v-for="(item, index) in commitment"
              :key="index"
            >
              <div
                class="text-[#409EFF] text-xs cursor-pointer inline-block item w-[150px] text-ellipsis-2"
                @click="downloadFile(item.url, item.name)"
              >
                {{ item.name }}
              </div>
            </el-tooltip>
          </el-descriptions-item>
          <el-descriptions-item label="风险类型" width="80">
            {{ riskType }}
          </el-descriptions-item>
          <el-descriptions-item label="推荐人/推荐单位">
            {{ detailInfo!.recommendUser || "-" }}
          </el-descriptions-item>
          <el-descriptions-item label="服务金额（元）">
            {{ detailInfo!.servicePrice || "-" }}
          </el-descriptions-item>
          <el-descriptions-item label="服务参与人数（人）">
            {{ detailInfo!.serviceJoinUserNum || "-" }}
          </el-descriptions-item>
          <el-descriptions-item label="服务范围">
            {{ serviceRange }}
          </el-descriptions-item>
          <el-descriptions-item label="合作时间">
            {{ cooperateTime }}
          </el-descriptions-item>
          <el-descriptions-item label="社会统一信用代码">
            {{ detailInfo!.creditCode }}
          </el-descriptions-item>
          <el-descriptions-item label="企业营业执照">
            <el-image
              style="width: 150px; height: 150px"
              :src="srcList[2]"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="srcList"
              :initial-index="2"
              fit="cover"
            />
          </el-descriptions-item>
          <el-descriptions-item label="食品经营许可证">
            <el-image
              class="mr-3"
              v-for="(_item, idex) in operatePermit"
              :key="idex"
              style="width: 150px; height: 150px"
              :src="srcList[3 + idex]"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="srcList"
              :initial-index="3 + idex"
              fit="cover"
            />
          </el-descriptions-item>
          <el-descriptions-item label="企业简介" :span="6">
            {{ detailInfo!.companyProfile || "-" }}
          </el-descriptions-item>
          <el-descriptions-item label="备注">
            {{ detailInfo!.remark || "-" }}
          </el-descriptions-item>
        </el-descriptions>

        <el-descriptions
          class="mt-10"
          title="负责人信息"
          direction="vertical"
          :column="5"
          size="default"
          border
        >
          <el-descriptions-item label="姓名">{{
            detailInfo!.name
          }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{
            detailInfo!.mobile
          }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{
            detailInfo!.email
          }}</el-descriptions-item>
          <el-descriptions-item label="身份证（人像面）">
            <el-image
              style="width: 150px; height: 150px"
              :src="srcList[0]"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="srcList"
              :initial-index="0"
              fit="cover"
            />
          </el-descriptions-item>
          <el-descriptions-item label="身份证（国徽面）">
            <el-image
              style="width: 150px; height: 150px"
              :src="srcList[1]"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="srcList"
              :initial-index="1"
              fit="cover"
            />
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
  <!-- end -->

  <!-- 核验拒绝 -->
  <el-dialog v-model="dialogVisible" title="核验资料" width="500">
    <el-divider class="!mt-0" />
    <el-form ref="formTag" :model="formData" :rules="formRules">
      <el-form-item prop="reason" label="驳回理由：">
        <el-input
          v-model="formData.reason"
          type="textarea"
          placeholder="请输入"
          show-word-limit
          :maxlength="500"
          :autosize="{
            minRows: 5,
          }"
        />
      </el-form-item>
      <el-form-item class="!mb-0">
        <div class="flex justify-end w-full">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            :loading="rejectLoading"
            @click="handleReject(formTag)"
            >确 定</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 合作审核 -->
  <el-dialog v-model="dialogVisibleEntryAudit" title="合作处理" width="500">
    <el-divider class="!mt-0" />
    <el-form
      ref="formDataEntryAuditTag"
      :model="formDataEntryAudit"
      :rules="formDataEntryAuditRules"
    >
      <el-form-item label="企业名称：">
        <div>{{ detailInfo?.enterpriseName }}</div>
      </el-form-item>
      <el-form-item prop="state" label="是否合作：">
        <el-radio-group v-model="formDataEntryAudit.state">
          <el-radio :value="State.ShortlistingSuccess">是</el-radio>
          <el-radio :value="State.ShortlistingError">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="!mb-0">
        <div class="flex justify-end w-full">
          <el-button @click="dialogVisibleEntryAudit = false">取 消</el-button>
          <el-button
            type="primary"
            :loading="entryAuditLoading"
            @click="handleEntryAudit(formDataEntryAuditTag)"
            >确 定</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 核验资料审核 -->
  <el-dialog v-model="dialogVisibleExamine" title="核验资料" width="500">
    <el-divider class="!mt-0" />
    <div class="flex flex-items-center">
      <el-icon color="#faad14" size="32" class="mr-3"
        ><WarningFilled
      /></el-icon>
      <span class="font-semibold">是否确认该企业的资料核验通过？</span>
    </div>
    <div class="flex justify-end w-full">
      <el-button @click="dialogVisibleExamine = false">取 消</el-button>
      <el-button type="primary" :loading="passLoading" @click="handlePass"
        >确 定</el-button
      >
    </div>
  </el-dialog>
  <!-- 修改风险类型 -->
  <el-dialog v-model="dialogVisibleRiskType" title="修改风险类型" width="500">
    <el-divider class="!mt-0" />
    <el-form :model="formDataPass" class="mt-2">
      <el-form-item prop="riskType" label="风险类型：">
        <el-radio-group v-model="formDataPass.riskType">
          <el-radio :value="RiskType.loweRisk">低风险</el-radio>
          <el-radio :value="RiskType.highRisk">高风险</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="!mb-0">
        <div class="flex justify-end w-full">
          <el-button @click="dialogVisibleRiskType = false">取 消</el-button>
          <el-button
            type="primary"
            :loading="handleRiskTypeDisable"
            @click="handleRiskType"
            >确 定</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import EntryAgreement from "../../entry-process/components/entry-agreement.vue";
import { WarningFilled } from "@element-plus/icons-vue";
import type { User } from "@/types";
import {
  State,
  RiskType,
  CooperateTime,
  ServiceRange,
  CooperateType,
} from "@/enums";
import { downloadFile } from "@/utils";
import { apiUpdateUser } from "@/api/user";
import type { FormInstance, FormRules } from "element-plus";
import { computed } from "vue";
import { OPERATIONMOBILE } from "@/constants";
import { apiSendMessage } from "@/api/common";

const emits = defineEmits([
  "goList",
  "goDetails",
  "addNum",
  "subNum",
  "updateDetailInfoState",
]);
const props = defineProps<{
  detailInfo?: Required<User>;
  successesNum: number;
  passNum: number;
  pendingNum: number;
  isChairman: boolean;
}>();

const showCooperateTypeBtn = computed(() => {
  let bool: boolean;
  if (props.detailInfo && props.detailInfo.state < State.successes) {
    bool = true;
  } else {
    bool = false;
  }
  return bool;
});

// const mobile = useRoute().query.mobile as string;
// const isChairman = computed(() => {
//   return mobile && CHAIRMAN.includes(mobile);
// });

const cooperateLabel = computed(() => {
  if (props.detailInfo && props.detailInfo.cooperateType) {
    switch (props.detailInfo.cooperateType) {
      case CooperateType.SunshineBenefits:
        return "阳光福利";
      case CooperateType.ConsumptionAssistance:
        return "消费帮扶";
      case CooperateType.BirthdayBenefits:
        return "生日福利";
      case CooperateType.HuishiCooperation:
        return "惠师合作";
      default:
        return "-" as never;
    }
  } else {
    return "-";
  }
});

const riskTypeValue = ref(props.detailInfo && props.detailInfo.riskType);
const riskType = computed(() => {
  if (riskTypeValue.value) {
    switch (riskTypeValue.value) {
      case RiskType.highRisk:
        return "高风险";
      case RiskType.loweRisk:
        return "低风险";
    }
  } else {
    return "-";
  }
});
const cooperateTime = computed(() => {
  if (props.detailInfo!.cooperateTime) {
    switch (props.detailInfo!.cooperateTime) {
      case CooperateTime.moreThanThreeMonths:
        return "三个月以上";
      case CooperateTime.lessThanThreeMonths:
        return "三个月以下";
    }
  } else {
    return "-";
  }
});
const serviceRange = computed(() => {
  if (props.detailInfo!.serviceRange) {
    switch (props.detailInfo!.serviceRange) {
      case ServiceRange.LargeCityArea:
        return "大市范围";
      case ServiceRange.CountyScope:
        return "区（县、市）范围";
      case ServiceRange.GrassrootsScope:
        return "基层范围";
    }
  } else {
    return "-";
  }
});
let operatePermit: string[] = [];
if (props.detailInfo?.operatePermit) {
  try {
    operatePermit = JSON.parse(props.detailInfo?.operatePermit).map(
      (it: { name: string; url: string }) => it.url
    );
  } catch (e) {
    operatePermit = [props.detailInfo?.operatePermit];
  }
}

const srcList = reactive<string[]>([
  props.detailInfo?.idCardFront!,
  props.detailInfo?.idCardOpposite!,
  props.detailInfo?.businessLicense!,
  ...operatePermit,
]);

let commitment = ref<{ name: string; url: string }[]>([{ name: "", url: "" }]);
try {
  commitment.value = JSON.parse(props.detailInfo?.commitment!);
} catch (e) {
  commitment.value = [
    {
      name: "承诺书." + props.detailInfo?.commitment!.split(".").pop(),
      url: props.detailInfo?.commitment!,
    },
  ];
}

const active = computed(() => {
  switch (props.detailInfo!.state) {
    case State.know:
      return 0;
    case State.declare:
      if (props.detailInfo && props.detailInfo.cooperateType) {
        return 3;
      }
      return props.detailInfo!.materialApplyState!;
    case State.successes:
    case State.error:
      return 4;
    case State.ShortlistingError:
    case State.ShortlistingSuccess:
      return 5;
    default:
      return 0;
  }
});

const dialogVisibleRiskType = ref(false);
const handleRiskTypeDisable = ref(false);
const formDataPass = reactive<{ riskType: RiskType }>({
  riskType: props.detailInfo!.riskType || RiskType.highRisk,
});
const handleRiskType = async () => {
  handleRiskTypeDisable.value = true;
  apiUpdateUser({
    id: props.detailInfo?.id!,
    riskType: formDataPass.riskType,
  })
    .then((_res) => {
      riskTypeValue.value = formDataPass.riskType;
      ElMessage({
        type: "success",
        message: "风险类型更改成功",
      });
    })
    .finally(() => {
      dialogVisibleRiskType.value = false;
      handleRiskTypeDisable.value = false;
    });
};

const dialogVisibleExamine = ref(false);
const passLoading = ref(false);
const handlePass = async () => {
  if (props.detailInfo && !props.detailInfo.cooperateType) {
    return ElMessage({
      message: "未选择合作类型无法审核",
      type: "warning",
    });
  }
  passLoading.value = true;
  const state =
    riskTypeValue.value === RiskType.loweRisk
      ? State.ShortlistingSuccess
      : State.successes;
  apiUpdateUser({
    id: props.detailInfo?.id!,
    state,
  })
    .then(() => {
      emits("subNum", props.detailInfo?.state);
      emits("addNum", state);
      emits("updateDetailInfoState", state);
      ElMessage({
        type: "success",
        message: "核验通过成功",
      });
      sendMessage(`${props.detailInfo?.enterpriseName}的合作申请已被审批`);
    })
    .finally(() => {
      dialogVisibleExamine.value = false;
      passLoading.value = false;
    });
};

const dialogVisible = ref(false);
const formTag = ref<FormInstance>();
const formData = reactive<{ reason: string }>({
  reason: "",
});
const formRules = reactive<FormRules<{ reason: string }>>({
  reason: [{ required: true, message: "请输入拒绝理由", trigger: "blur" }],
});
const rejectLoading = ref(false);
const handleReject = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (props.detailInfo && !props.detailInfo.cooperateType) {
    return ElMessage({
      message: "未选择合作类型无法审核",
      type: "warning",
    });
  }
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      rejectLoading.value = true;
      apiUpdateUser({
        id: props.detailInfo?.id!,
        state: State.error,
        reason: formData.reason,
      })
        .then((_res) => {
          emits("subNum", props.detailInfo?.state);
          emits("addNum", State.error);
          emits("updateDetailInfoState", State.error);
          ElMessage({
            type: "success",
            message: "核验拒绝成功",
          });
          sendMessage(`${props.detailInfo?.enterpriseName}的合作申请已被审批`);
        })
        .finally(() => {
          dialogVisible.value = false;
          rejectLoading.value = false;
        });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const dialogVisibleEntryAudit = ref(false);
const formDataEntryAuditTag = ref<FormInstance>();
const formDataEntryAudit = reactive<{ state?: State }>({
  state: undefined,
});
const formDataEntryAuditRules = reactive<FormRules<{ state: State }>>({
  state: [{ required: true, message: "请选择", trigger: "blur" }],
});
const entryAuditLoading = ref(false);
const handleEntryAudit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (props.detailInfo && !props.detailInfo.cooperateType) {
    return ElMessage({
      message: "未选择合作类型无法审核",
      type: "warning",
    });
  }
  entryAuditLoading.value = true;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      apiUpdateUser({
        id: props.detailInfo?.id!,
        state: formDataEntryAudit.state,
      })
        .then((_res) => {
          emits("subNum", props.detailInfo?.state);
          emits("addNum", formDataEntryAudit.state);
          emits("updateDetailInfoState", formDataEntryAudit.state);
          ElMessage({
            type: "success",
            message: "处理成功",
          });
          sendMessage(`${props.detailInfo?.enterpriseName}的合作申请已被审批`);
        })
        .finally(() => {
          dialogVisibleEntryAudit.value = false;
          entryAuditLoading.value = false;
        });
    } else {
      console.log("error submit!", fields);
    }
  });
};

let isSend = true;
const sendMessage = (message: string) => {
  if (props.isChairman && isSend) {
    isSend = false;
    apiSendMessage({
      mobile: OPERATIONMOBILE,
      message,
    }).finally(() => {
      isSend = true;
    });
  }
};
</script>

<style scoped lang="scss">
:deep(label) {
  font-weight: 400;
}
</style>
