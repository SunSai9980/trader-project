<template>
  <div>
    <LoginNav @onClick="dialogVisible = true" />
    <LoginMain @onClick="dialogVisible = true" />
  </div>
  <el-dialog v-model="dialogVisible" width="500">
    <div class="text-center text-lg">登录</div>
    <el-form
      :model="loginForm"
      ref="formTag"
      :rules="rules"
      label-width="0px"
      class="m-auto w-[300px] mt-4"
    >
      <el-form-item prop="mobile">
        <el-input
          v-model="loginForm.mobile"
          :prefix-icon="Iphone"
          autocomplete="off"
          placeholder="手机号"
        />
      </el-form-item>
      <el-form-item>
        <el-row :gutter="8">
          <el-col :span="14"
            ><el-input
              :prefix-icon="Message"
              v-model="loginForm.code"
              placeholder="验证码"
          /></el-col>
          <el-col :span="10">
            <el-button
              @click="sendCode"
              :disabled="isSending"
              class="w-30 block"
              >{{ codeText }}</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="large"
          class="block w-full mt-3"
          @click="submitForm(formTag)"
          :loading="loading"
          >登 录</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import LoginNav from "./components/login-nav.vue";
import LoginMain from "./components/login-main.vue";
import { ref, reactive } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import { validatorMobile, regPhone } from "@/utils";
import { Message, Iphone } from "@element-plus/icons-vue";
import { apiLogin, apiSendCode, apiOnlyValidCode } from "@/api/user";
import { useUserInfo } from "@/store";
import { useRouter } from "vue-router";

interface LoginForm {
  mobile: string;
  code: string;
}

const router = useRouter();
const user = useUserInfo();
const dialogVisible = ref<boolean>(false);
const loading = ref<boolean>(false);
const codeText = ref<string | number>("获取验证码");
const isSending = ref<boolean>(false);

const formTag = ref<FormInstance>();

const rules = reactive<FormRules<LoginForm>>({
  mobile: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      validator: validatorMobile,
      trigger: "blur",
    },
  ],
  code: { required: true, message: "请输入验证码", trigger: "blur" },
});

const loginForm = reactive<LoginForm>({
  mobile: "", //19912345678
  code: "", //246810
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true;
      try {
        await apiOnlyValidCode({
          phone: loginForm.mobile,
          code: loginForm.code,
        });
        const { data } = await apiLogin(loginForm.mobile);
        user.$state = data;
        loading.value = false;
        dialogVisible.value = false;
        router.replace("/");
      } catch (e) {
        loading.value = false;
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
const sendCode = async () => {
  if (!loginForm.mobile && !regPhone.test(loginForm.mobile)) {
    ElMessage({
      message: "请检查手机号码是否正确",
      type: "error",
    });
    return;
  }
  if (!isSending.value) {
    isSending.value = true;
    await apiSendCode({ phone: loginForm.mobile });
    codeText.value = 60;
    const intervalId = setInterval(() => {
      if (codeText.value) {
        (codeText.value as number) -= 1;
      } else {
        isSending.value = false;
        codeText.value = "获取验证码";
        clearInterval(intervalId);
      }
    }, 1000);
  } else {
  }
};
</script>

<style scoped lang="scss"></style>
