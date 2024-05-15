<template>
  <div class="flex my-6">
    <div text-center>
      <span>状态：</span>
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
    </div>
    <el-button type="primary" :icon="Search" class="ml-2" @click="getList"
      >搜索</el-button
    >
    <el-button @click="getListAll">全部</el-button>
  </div>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    table-layout="auto"
    empty-text="暂无内容"
  >
    <el-table-column fixed prop="orgName" label="询价工会" />
    <el-table-column prop="welfareName" label="名称" />
    <el-table-column prop="createTime" label="创建时间" width="180" />
    <el-table-column label="状态" width="120">
      <template #default="scope">
        {{ stateTime(scope.row.askEndTime) }}
      </template>
    </el-table-column>
    <el-table-column label="操作" fixed="right" width="120">
      <template #default="scope">
        <el-button type="primary" link @click="goDetails(scope.row)"
          >查看详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-config-provider :locale="zhCn">
    <el-pagination
      class="mt-5 flex justify-end"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :small="false"
      :disabled="false"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </el-config-provider>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { InquiryStatus, Open } from "@/enums";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { apiSupplierList } from "@/api/union-inquiry";
import { useUserInfo } from "@/store";
import type { SupplierWelfareItem } from "@/types/union-inquiry";
import dayjs from "dayjs";

const options = reactive([
  {
    value: InquiryStatus.start,
    label: "进行中",
  },
  {
    value: InquiryStatus.end,
    label: "已结束",
  },
]);
defineProps<{ detailInfo?: SupplierWelfareItem }>();

const stateTime = (end: Date) => {
  if (dayjs(end).valueOf() > dayjs().valueOf()) {
    return "进行中";
  } else {
    return "已结束";
  }
};

const user = useUserInfo();
const emits = defineEmits(["goDetail", "goList"]);
const state = defineModel<InquiryStatus | undefined>("state");
const tableData = ref<SupplierWelfareItem[]>([]);
const currentPage = defineModel<number>("currentPage", { default: 1 });
const pageSize = defineModel<number>("pageSize", { default: 10 });
const total = defineModel<number>("total", { default: 0 });
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
const goDetails = (data: SupplierWelfareItem) => {
  emits("goDetail", data);
};

const getList = async () => {
  const { data } = await apiSupplierList({
    deleted: false,
    supplierMobile: user.loginMobile!,
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    state: state.value,
    open: Open.open,
  });
  if (data) {
    total.value = data.total || 0;
    tableData.value = data.list;
  }
};
const getListAll = async () => {
  const { data } = await apiSupplierList({
    deleted: false,
    supplierMobile: user.loginMobile!,
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    state: undefined,
    open: Open.open,
  });
  if (data) {
    total.value = data.total || 0;
    tableData.value = data.list;
  }
};

onMounted(async () => {
  await getList();
});
</script>

<style scoped lang="scss"></style>
