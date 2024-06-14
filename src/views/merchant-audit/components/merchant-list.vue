<template>
  <div class="bg-#f0f2f5 pb-3">
    <el-row class="bg-white py-5 rounded-lg">
      <el-col :span="8" class="text-center border-r-1 border-e-#e9e9e9">
        <div class="text-xs text-#8d8d8d">我的待办</div>
        <div>{{ pendingNum }}个</div>
      </el-col>
      <el-col :span="8" class="text-center border-r-1 border-e-#e9e9e9">
        <div class="text-xs text-#8d8d8d">合作资格</div>
        <div>{{ passNum }}个</div></el-col
      >
      <el-col :span="8" class="text-center">
        <div class="text-xs text-#8d8d8d">合作商户</div>
        <div>{{ successesNum }}个</div></el-col
      >
    </el-row>
  </div>
  <div class="pb-3">
    <div class="px-8 py-5 font-bold border-b border-b-#e9e9e9">记录列表</div>
    <div class="p-5">
      <el-form class="flex items-center flex-wrap">
        <el-form-item label="企业名称：" class="mr-2">
          <el-input v-model="enterpriseName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态：" class="mr-2">
          <el-select
            v-model="state"
            placeholder="请选择"
            style="width: 240px"
            :clearable="true"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="getList()"
            >搜索</el-button
          >
          <el-button @click="getList(true)">全部记录</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        table-layout="auto"
        empty-text="暂无内容"
      >
        <el-table-column fixed prop="enterpriseName" label="企业名称" />
        <el-table-column label="推荐人" prop="recommendUser">
          <template #default="scope">{{
            scope.row.recommendUser || "-"
          }}</template>
        </el-table-column>
        <el-table-column label="更新时间" prop="modifyTime" width="180">
          <template #default="scope">
            {{ dayjs(scope.row.modifyTime).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state" width="100">
          <template #default="scope">{{ stateMsg(scope.row.state) }} </template>
        </el-table-column>
        <el-table-column label="风险类型" prop="riskType" width="100">
          <template #default="scope">{{
            scope.row.riskType === RiskType.highRisk
              ? "高风险"
              : scope.row.riskType === RiskType.loweRisk
              ? "低风险"
              : "-"
          }}</template>
        </el-table-column>
        <el-table-column label="合作类型" prop="cooperateType" width="180">
          <template #default="scope">
            <div v-if="isChairman || scope.row.cooperateType">
              {{ cooperateLabel(scope.row.cooperateType) }}
            </div>
            <div v-else>
              <el-select
                v-model="scope.row.cooperateType"
                placeholder="请选择合作类型"
                :clearable="true"
                @change="handleCooperateType(scope.row)"
              >
                <el-option
                  v-for="item in cooperateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" width="200">
          <template #default="scope">
            <div v-if="isChairman">{{ scope.row.remark || "-" }}</div>
            <el-input
              v-else
              v-model="scope.row.remark"
              autosize
              type="textarea"
              maxlength="200"
              show-word-limit
              placeholder=""
              @change="handleRemark(scope.row)"
              @focus="handleFocus(scope.row.remark)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template #default="scope">
            <el-space :size="5" :spacer="spacer">
              <el-button type="primary" link @click="handleRemove(scope.row)"
                >删除</el-button
              >
              <el-button
                type="primary"
                link
                @click="$emit('goDetails', scope.row)"
                >查看详情</el-button
              >
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-config-provider :locale="zhCn">
      <el-pagination
        class="mt-5 flex justify-end pr-3"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :small="false"
        :disabled="false"
        :background="true"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { Search } from "@element-plus/icons-vue";
import type { User } from "@/types";
import { apiDelUser, apiUserList, apiUpdateUser } from "@/api/user";
import { MaterialApplyState, CooperateType, RiskType, State } from "@/enums";
import dayjs from "dayjs";
// import { CHAIRMAN } from "@/constants";
// import { useRoute } from "vue-router";

const props = defineProps<{
  detailInfo?: Required<User>;
  successesNum: number;
  passNum: number;
  pendingNum: number;
  isChairman: boolean;
}>();
const emits = defineEmits([
  "goList",
  "goDetails",
  "addNum",
  "subNum",
  "updateDetailInfoState",
]);

// const mobile = useRoute().query.mobile as string;
// const isChairman = computed(() => {
//   return mobile && CHAIRMAN.includes(mobile);
// });

const spacer = h(ElDivider, { direction: "vertical" });
const enterpriseName = defineModel<string>("enterpriseName");
const state = defineModel<State | undefined>("state");
const currentPage = defineModel<number>("currentPage", { default: 1 });
const pageSize = defineModel<number>("pageSize", { default: 10 });
const total = defineModel<number>("total", { default: 0 });

const options = reactive([
  {
    value: State.declare,
    label: "待核验",
  },
  {
    value: State.error,
    label: "被驳回",
  },
  {
    value: State.successes,
    label: "已通过",
  },
  {
    value: State.ShortlistingError,
    label: "未合作",
  },
  {
    value: State.ShortlistingSuccess,
    label: "已合作",
  },
]);
const cooperateOptions = [
  {
    label: "阳光福利",
    value: CooperateType.SunshineBenefits,
  },
  {
    label: "消费帮扶",
    value: CooperateType.ConsumptionAssistance,
  },
  {
    label: "生日福利",
    value: CooperateType.BirthdayBenefits,
  },
  {
    label: "惠师合作",
    value: CooperateType.HuishiCooperation,
  },
];
const cooperateLabel = (type: CooperateType) => {
  switch (type) {
    case CooperateType.SunshineBenefits:
      return "阳光福利";
    case CooperateType.ConsumptionAssistance:
      return "消费帮扶";
    case CooperateType.BirthdayBenefits:
      return "生日福利";
    case CooperateType.HuishiCooperation:
      return "惠师合作";
    default:
      return "-";
  }
};

const stateMsg = (state: State) => {
  switch (state) {
    case State.declare:
      return "待核验";
    case State.error:
      return "被驳回";
    case State.successes:
      return "已通过";
    case State.ShortlistingSuccess:
      return "已合作";
    case State.ShortlistingError:
      return "未合作";
    default:
      return "未提交核验资料";
  }
};

// const formData = reactive<MerchantForm>({
//   enterpriseName: "",
//   state: undefined,
// });
const tableData = ref<Required<User>[]>([]);
// const currentPage = ref(1);
// const pageSize = ref(10);
// const total = ref(0);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  nextTick(async () => {
    await getList();
  });
};
const handleCurrentChange = async (val: number) => {
  currentPage.value = val;
  nextTick(async () => {
    await getList();
  });
};
const handleRemove = async (data: Required<User>) => {
  ElMessageBox.confirm("是否确认删除该申报记录？", "", {
    confirmButtonText: "确 认",
    cancelButtonText: "取 消",
    type: "warning",
  })
    .then(() => {
      apiDelUser(data.id)
        .then(() => {
          emits("subNum", data.state);
          ElMessage.success("删除成功");
          getList();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消",
      });
    });
};
const getList = async (all: boolean = false) => {
  if (all) {
    state.value = undefined;
    enterpriseName.value = "";
  }
  const {
    data: { records, total: allNum },
  } = await apiUserList({
    deleted: false,
    materialApplyState: MaterialApplyState.fulfil,
    current: currentPage.value,
    size: pageSize.value,
    descs: "modify_time",
    enterpriseName: enterpriseName.value,
    states: state.value ? [state.value] : [2, 3, 4, 5, 6],
    cooperateTypes: props.isChairman
      ? [
          CooperateType.BirthdayBenefits,
          CooperateType.ConsumptionAssistance,
          CooperateType.HuishiCooperation,
          CooperateType.SunshineBenefits,
        ]
      : undefined,
  });
  total.value = allNum;
  tableData.value = records;
};

const handleCooperateType = (item: User) => {
  ElMessageBox.confirm("是否确认该合作类型？选择后无法修改", "", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      apiUpdateUser({
        id: item.id,
        cooperateType: item.cooperateType,
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "设置成功",
          });
        })
        .catch((error) => {
          ElMessage.error(error.data || error.message);
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消",
      });
      item.cooperateType = undefined;
    });
};

let currentRemark: string | undefined;
const handleRemark = (item: User) => {
  ElMessageBox.confirm("是否确认更改备注？", "", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      apiUpdateUser({
        id: item.id,
        remark: item.remark,
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "更改成功",
          });
        })
        .catch((error) => {
          ElMessage.error(error.data || error.message);
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消",
      });
      item.remark = currentRemark;
    });
};
const handleFocus = (str: string) => {
  currentRemark = str;
};

onMounted(async () => {
  await getList();
});
</script>

<style scoped lang="scss">
:deep(label) {
  font-weight: 400;
}
</style>
