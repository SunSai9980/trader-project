<template>
  <div class="p-8 h-full">
    <div
      class="flex items-center justify-between px-6 py-3 bg-#fafafa border-1 rounded-lg"
      border-color-gray
    >
      <span class="font-bold text-xl">工会询价</span>
      <el-button type="primary" @click="component = UnionList"
        >询价列表</el-button
      >
    </div>
    <component
      :is="component"
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

const component = shallowRef(UnionList);
const detailInfo = ref<SupplierWelfareItem>();
const goDetail = (data: SupplierWelfareItem) => {
  component.value = UnionDetails;
  detailInfo.value = data;
};
const goList = () => {
  component.value = UnionList;
};
</script>

<style lang="scss" scoped></style>
