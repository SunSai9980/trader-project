<template>
  <div class="h-full">
    <div class="p-8 pb-0">
      <div
        class="flex items-center justify-between px-6 py-3 bg-#fafafa border-1 rounded-lg"
        border-color-gray
      >
        <span class="font-bold text-xl">工会询价</span>
        <el-button type="primary" @click="component = UnionList"
          >询价列表</el-button
        >
      </div>
    </div>

    <component
      :is="component"
      v-model:state="state"
      v-model:currentPage="currentPage"
      v-model:pageSize="pageSize"
      v-model:total="total"
      @goDetail="goDetail"
      @goList="goList"
      :detailInfo="detailInfo"
    />
  </div>
</template>

<script setup lang="ts">
import UnionList from "./components/union-list.vue";
import UnionDetails from "./components/union-details.vue";
import type { SupplierWelfareItem } from "@/types/union-inquiry";
import { InquiryStatus } from "@/enums";

const component = shallowRef(UnionList);
const detailInfo = ref<SupplierWelfareItem>();
const state = ref<InquiryStatus | undefined>();
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const goDetail = (data: SupplierWelfareItem) => {
  component.value = UnionDetails as unknown as typeof UnionList;
  detailInfo.value = data;
};
const goList = () => {
  component.value = UnionList;
};
</script>

<style lang="scss" scoped></style>
