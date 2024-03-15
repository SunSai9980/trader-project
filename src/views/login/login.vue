<template>
  <div class="common-layout">
    <el-container>
      <el-header border-b border-style-solid flex items-center>
        <component-nav />
      </el-header>
      <el-main class="main">
        <div>赋能工会 传递关爱</div>
        <div>便捷高效| 透明合规 | 统筹管理 | 升级体验</div>
        <div>
          <div class="circle relative">
            <div text-center class="p-t-[20px]">供应多选</div>
            <div class="w-[100px]">公平竞价响应数据智能归集</div>
          </div>
          <div w-sm flex flex-justify-around>
            <div class="small-circle"></div>
            <div class="small-circle"></div>
            <div class="small-circle"></div>
          </div>
        </div>
        <el-button @click="apply">申请入驻</el-button>
      </el-main>
    </el-container>
  </div>

  <el-dialog v-model="dialogVisible" title="" width="500">
    <div class="m-t-[20px] text-center m-b-[10px]">登录</div>
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="loginForm"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item prop="phone">
        <el-input v-model="loginForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="code">
        <el-col :span="12" m-r-xl>
          <el-input v-model="loginForm.code" autocomplete="off" />
        </el-col>
        <el-col :span="6">
          <el-button>发送验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import { regPhone } from "@/utils";
import { createUser } from "@/api/user";

const dialogVisible = ref(true);
const ruleFormRef = ref<FormInstance>();
const loginForm = reactive({
  phone: "",
  code: "",
});

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else if (regPhone.test(value)) {
    callback();
  } else {
    callback(new Error("手机号格式错误"));
  }
};
const rules = reactive<FormRules<typeof loginForm>>({
  phone: [{ validator: validatePass, trigger: "blur" }],
  code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
});
const apply = () => {};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped lang="scss">
.main {
  height: calc(100vh - 60px);
}
.circle {
  width: 222px;
  height: 222px;
  border-radius: 50%;
  background-color: #fce9e4;
}
.small-circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fce9e4;
}
</style>
