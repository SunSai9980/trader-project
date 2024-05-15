<template>
  <div>
    <div class="px-5 py-2 font-semibold text-lg">流程进度</div>
    <el-divider class="!mt-0" />
    <EntryAgreement :active="active" class="border-none !pt-0" />
    <div class="bg-#f0f2f5"></div>
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
      <div class="px-5">
        <div class="font-semibold text-xs">负责人信息</div>
        <el-row class="mt-5" :gutter="10">
          <el-col :span="8">
            <div class="flex text-sm">
              <div>姓名：</div>
              <div class="text-#5a5a5a">{{ detailInfo!.name }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="flex text-sm">
              <div>手机号：</div>
              <div class="text-#5a5a5a">{{ detailInfo!.mobile }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="flex text-sm">
              <div>邮箱：</div>
              <div class="text-#5a5a5a">{{ detailInfo!.email }}</div>
            </div>
          </el-col>
        </el-row>
        <div class="flex text-sm mt-8">
          <div>身份证：</div>
          <div class="mr-10">
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
            <div class="text-#5a5a5a text-center">人像面</div>
          </div>
          <div>
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
            <div class="text-#5a5a5a text-center">国徽面</div>
          </div>
        </div>

        <div class="font-semibold text-xs mt-10">企业信息</div>
        <el-row class="mt-5" :gutter="10">
          <el-col :span="8">
            <div class="flex text-sm">
              <div>企业名称：</div>
              <div class="text-#5a5a5a">{{ detailInfo!.enterpriseName }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="flex text-sm">
              <div>社会统一信用代码：</div>
              <div class="text-#5a5a5a">{{ detailInfo!.creditCode }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="flex text-sm">
              <div>推荐人/推荐单位：</div>
              <div class="text-#5a5a5a">
                {{ detailInfo!.recommendUser || "-" }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="mt-5" :gutter="10">
          <el-col :span="8">
            <div class="flex text-sm">
              <div>服务金额：</div>
              <div class="text-#5a5a5a">
                {{ detailInfo!.servicePrice || "-" }}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="flex text-sm">
              <div>服务参与人数：</div>
              <div class="text-#5a5a5a">
                {{ detailInfo!.serviceJoinUserNum || "-" }}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="flex text-sm">
              <div>服务范围：</div>
              <div class="text-#5a5a5a">
                {{ serviceRange }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="mt-5" :gutter="10">
          <el-col :span="8">
            <div class="flex text-sm">
              <div>合作时间：</div>
              <div class="text-#5a5a5a">{{ cooperateTime }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="flex text-sm">
              <div>风险类型：</div>
              <div class="text-#5a5a5a">{{ riskType }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="flex text-sm">
              <div class="w-[140px]">合作服务承诺登记书：</div>
              <span
                class="text-[#409EFF] cursor-pointer"
                v-for="(item, index) in commitment"
                :key="index"
                @click="downloadFile(item.url, item.name)"
                >{{ item.name }}</span
              >
            </div>
          </el-col>
        </el-row>
        <el-row class="mt-8 pb-20">
          <el-col :span="8">
            <div class="flex text-sm">
              <div>企业营业执照：</div>
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
            </div>
          </el-col>
          <el-col :span="16">
            <div class="flex text-sm">
              <div>食品经营许可证或其他特许经营许可证书（需加盖公章）：</div>
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
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
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
          <el-button type="primary" @click="handleReject(formTag)"
            >确 定</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
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
            @click="handleEntryAudit(formDataEntryAuditTag)"
            >确 定</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="dialogVisibleExamine" title="核验资料" width="500">
    <el-divider class="!mt-0" />
    <div class="flex flex-items-center">
      <el-icon color="#faad14" size="32" class="mr-3"
        ><WarningFilled
      /></el-icon>
      <span class="font-semibold">是否确认该企业的资料核验通过？</span>
    </div>
    <el-form :model="formDataPass" class="mt-2">
      <el-form-item prop="riskType" label="风险类型：">
        <el-radio-group v-model="formDataPass.riskType">
          <el-radio :value="RiskType.loweRisk">低风险</el-radio>
          <el-radio :value="RiskType.highRisk">高风险</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="!mb-0">
        <div class="flex justify-end w-full">
          <el-button @click="dialogVisibleExamine = false">取 消</el-button>
          <el-button type="primary" @click="handlePass">确 定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import EntryAgreement from "../../entry-process/components/entry-agreement.vue";
import { WarningFilled } from "@element-plus/icons-vue";
import type { User } from "@/types";
import { State, RiskType, CooperateTime, ServiceRange } from "@/enums";
import { downloadFile } from "@/utils";
import { apiUpdateUser } from "@/api/user";
import type { FormInstance, FormRules } from "element-plus";
import { computed } from "vue";

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
}>();

const riskType = computed(() => {
  if (props.detailInfo!.riskType) {
    switch (props.detailInfo!.riskType) {
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
      case ServiceRange.aboveDistrictLevel:
        return "区级及以上";
      case ServiceRange.belowDistrictLevel:
        return "区级以下基层工会";
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
      return props.detailInfo!.materialApplyState!;
    case State.successes:
    case State.error:
      return 3;
    case State.ShortlistingError:
    case State.ShortlistingSuccess:
      return 4;
    default:
      return 0;
  }
});

const dialogVisibleExamine = ref(false);
const formDataPass = reactive<{ riskType: RiskType }>({
  riskType: props.detailInfo!.riskType || RiskType.highRisk,
});
const handlePass = async () => {
  // ElMessageBox.confirm("是否确认该企业的资料核验通过？", {
  //   type: "warning",
  //   icon: markRaw(WarningFilled),
  // }).then(() => {
  const state =
    formDataPass.riskType === RiskType.loweRisk
      ? State.ShortlistingSuccess
      : State.successes;
  apiUpdateUser({
    id: props.detailInfo?.id!,
    state,
    riskType: formDataPass.riskType,
  }).then(() => {
    emits("subNum", props.detailInfo?.state);
    emits("addNum", state);
    emits("updateDetailInfoState", state);
    ElMessage({
      type: "success",
      message: "核验通过成功",
    });
    dialogVisibleExamine.value = false;
  });
  // });
};

const dialogVisible = ref(false);
const formTag = ref<FormInstance>();
const formData = reactive<{ reason: string }>({
  reason: "",
});
const formRules = reactive<FormRules<{ reason: string }>>({
  reason: [{ required: true, message: "请输入拒绝理由", trigger: "blur" }],
});
const handleReject = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      dialogVisible.value = false;
      apiUpdateUser({
        id: props.detailInfo?.id!,
        state: State.error,
        reason: formData.reason,
      }).then((_res) => {
        emits("subNum", props.detailInfo?.state);
        emits("addNum", State.error);
        emits("updateDetailInfoState", State.error);
        ElMessage({
          type: "success",
          message: "核验拒绝成功",
        });
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
const handleEntryAudit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      dialogVisibleEntryAudit.value = false;
      apiUpdateUser({
        id: props.detailInfo?.id!,
        state: formDataEntryAudit.state,
      }).then((_res) => {
        emits("subNum", props.detailInfo?.state);
        emits("addNum", formDataEntryAudit.state);
        emits("updateDetailInfoState", formDataEntryAudit.state);
        ElMessage({
          type: "success",
          message: "处理成功",
        });
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped lang="scss">
:deep(label) {
  font-weight: 400;
}
</style>
