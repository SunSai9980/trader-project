<template>
  <div class="bg-#f0f2f5 pb-3">
    <el-row class="bg-white py-5 rounded-lg">
      <el-col :span="8" class="text-center border-r-1 border-e-#e9e9e9">
        <div class="text-xs text-#8d8d8d">我的待办</div>
        <div>{{ pendingNum }}个</div>
      </el-col>
      <el-col :span="8" class="text-center border-r-1 border-e-#e9e9e9">
        <div class="text-xs text-#8d8d8d">入驻资格</div>
        <div>{{ passNum }}个</div></el-col
      >
      <el-col :span="8" class="text-center">
        <div class="text-xs text-#8d8d8d">阳光福利入驻商户</div>
        <div>{{ successesNum }}个</div></el-col
      >
    </el-row>
  </div>
  <div class="pb-3">
    <div class="px-8 py-5 font-bold border-b border-b-#e9e9e9">记录列表</div>
    <div class="p-5">
      <el-form :model="formData" class="flex items-center flex-wrap">
        <el-form-item label="企业名称：" class="mr-2">
          <el-input v-model="formData.enterpriseName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态：" class="mr-2">
          <el-select
            v-model="formData.state"
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
        <el-table-column prop="name" label="负责人" width="120" />
        <el-table-column prop="loginMobile" label="负责人手机号" width="120" />
        <el-table-column label="更新时间" prop="modifyTime" width="180">
          <template #default="scope">
            {{ dayjs(scope.row.modifyTime).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">{{ stateMsg(scope.row.state) }} </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template #default="scope">
            <el-space :size="10" :spacer="spacer">
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
import { State } from "@/enums";
import type { MerchantForm, User } from "@/types";
import { apiDelUser, apiUserList } from "@/api/user";
import { MaterialApplyState } from "@/enums";
import dayjs from "dayjs";

defineProps<{
  detailInfo?: Required<User>;
  successesNum: number;
  passNum: number;
  pendingNum: number;
}>();
const emits = defineEmits([
  "goList",
  "goDetails",
  "addNum",
  "subNum",
  "updateDetailInfoState",
]);
const spacer = h(ElDivider, { direction: "vertical" });

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
    label: "未入驻",
  },
  {
    value: State.ShortlistingSuccess,
    label: "已入驻",
  },
]);
const stateMsg = (state: State) => {
  switch (state) {
    case State.declare:
      return "待核验";
    case State.error:
      return "被驳回";
    case State.successes:
      return "已通过";
    case State.ShortlistingSuccess:
      return "已入驻";
    case State.ShortlistingError:
      return "未入驻";
    default:
      return "未提交核验资料";
  }
};

const formData = reactive<MerchantForm>({
  enterpriseName: "",
  state: undefined,
});
const tableData = ref<Required<User>[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  await getList();
};
const handleCurrentChange = async (val: number) => {
  console.log(val);
  currentPage.value = val;
  await getList();
};
const handleRemove = async (data: Required<User>) => {
  await apiDelUser(data.id);
  emits("subNum", data.state);
  ElMessage.success("删除成功");
  getList();
};
const getList = async (all: boolean = false) => {
  if (all) {
    formData.state = undefined;
    formData.enterpriseName = "";
  }
  const {
    data: { records, total: allNum },
  } = await apiUserList({
    deleted: false,
    materialApplyState: MaterialApplyState.fulfil,
    current: currentPage.value,
    size: pageSize.value,
    descs: "modify_time",
    enterpriseName: formData.enterpriseName,
    states: formData.state ? [formData.state] : [2, 3, 4, 5, 6],
  });
  total.value = allNum;
  tableData.value = records;
};

onMounted(async () => {
  await getList(true);
});
</script>

<style scoped lang="scss">
:deep(label) {
  font-weight: 400;
}
</style>
