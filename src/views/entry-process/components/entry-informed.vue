<template>
  <div class="px-20 mt-10">
    <div text-base leading-7>欢迎使用阿拉教师码商户平台！</div>
    <div text-base leading-7>
      申请 “阳光福利” 商户入驻前，请仔细阅读并同意以下内容及<a
        class="text-[#409EFF]"
        hover="text-[#409EFF]"
        active="text-[#409EFF]"
        href="../../../assets/阿拉教师码用户协议0825.docx"
        download="阿拉教师码用户协议"
        >《阿拉教师码用户协议》</a
      >、<a
        class="text-[#409EFF]"
        hover="text-[#409EFF]"
        active="text-[#409EFF]"
        href="../../../assets/阿拉教师码用户隐私协议0425.docx"
        download="阿拉教师码用户隐私协议"
        >《阿拉教师码用户隐私协议》</a
      >。
    </div>
    <div text-base leading-7>
      1.
      在账号资质审核成功之后，账号的使⽤权属于通过资质审核的拟认证主体，该账号⾃注册时其产⽣的⼀切权利义务均由该主体承担，该账号所获得的所有收益、权限均归认证后的主体享有，且所有运营活动都必须以该主体对外开展。
    </div>
    <div text-base leading-7>
      2.
      拟入驻主体提交给阿拉教师码平台的核验资料真实⽆误，并不可撤销地授权阿拉教师码及其委托的任何第三⽅审核机构对提交的资料进⾏甄别核实。
    </div>
    <div text-base leading-7>
      3.
      拟入驻主体在申请商户入驻过程中填写并向阿拉教师码提交的申请人（包括后续不时变更的⼈员）为拟入驻主体指定的负责人，并特此授权由该指定⼈员以拟入驻主体的名义负责该主体商户账号的运营管理，同一申请人仅可认证一个主体账号。申请人的所有操作行为，均代表拟入驻主体，拟入驻主体均需承担一切责任。
    </div>
    <div text-base leading-7>
      4.
      认证资料审查通过后，平台将组织线下评审会（召开时间以短信形式发送至负责人），商户代表需出席会议并向到场专家宣讲企业背景和产品介绍，由评审委员会投票决定商户能否入围阿拉教师码阳光福利采购商户名单。评审未通过的商户可以重新发起入驻申请，评审通过的商户需在
      10 个工作日内完成平台签约，已签约的商户正式入驻阿拉教师码阳光福利商户。
    </div>
    <div text-base leading-7>
      5.
      拟入驻主体如违反上述承诺，均需承担一切责任，对阿拉教师码平台或第三方造成损失的，须赔偿损失。
    </div>
    <img
      class="w-full block"
      src="../../../assets/images/entry-materials/process.png"
      alt="流程图"
    />
  </div>
  <div
    class="border-t-1 mt-6 py-1 px-25 border-t-neutral-900 flex items-center"
  >
    <el-button
      size="large"
      type="primary"
      :disabled="!checked"
      class="mr-3 w-20"
      @click="handleClick"
      >提 交</el-button
    >
    <el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { apiUpdateUser } from "@/api/user";
import { useUserInfo } from "@/store";

const { user } = useUserInfo();
const checked = ref(false);
const emits = defineEmits(["stepNext"]);
const handleClick = () => {
  emits("stepNext", 2, 1);
  apiUpdateUser({ id: user.id, state: 1, commitment: 2 });
};
</script>

<style scoped lang="scss"></style>
