<template>
  <div class="bg-#f0f2f5 pb-3">
    <el-row class="bg-white py-5 rounded-lg">
      <el-col :span="8" class="text-center border-r-1 border-e-#e9e9e9">
        <div class="text-xs text-#8d8d8d">我的待办</div>
        <div>8个</div>
      </el-col>
      <el-col :span="8" class="text-center border-r-1 border-e-#e9e9e9">
        <div class="text-xs text-#8d8d8d">入驻资格</div>
        <div>8个</div></el-col
      >
      <el-col :span="8" class="text-center">
        <div class="text-xs text-#8d8d8d">阳光福利入驻商户</div>
        <div>8个</div></el-col
      >
    </el-row>
  </div>
  <div>
    <div class="px-8 py-5 font-bold border-b border-b-#e9e9e9">记录列表</div>
    <div class="p-5">
      <el-form :model="formData" class="flex items-center flex-wrap">
        <el-form-item label="企业名称：" class="mr-2">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态：" class="mr-2">
          <el-select
            v-model="formData.state"
            placeholder="请选择"
            style="width: 240px"
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
          <el-button type="primary" :icon="Search">搜索</el-button>
          <el-button>全部记录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { State } from "@/enums";
import type { MerchantForm } from "@/types";
defineEmits(["goList", "goDetails"]);

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

const formData = reactive<MerchantForm>({
  name: "",
  state: undefined,
});
</script>

<style scoped lang="scss">
:deep(label) {
  font-weight: 400;
}
</style>
