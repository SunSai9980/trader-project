<template>
  <div text-lg leading-7>欢迎使用阿拉教师码合作平台！</div>
  <div text-base leading-7 mt-2>
    申请 “阳光福利” 商户入驻前，请仔细阅读并同意以下内容及<span
      class="text-[#409EFF] cursor-pointer"
      @click="
        downloadFile(
          'https://ddup-education.oss-cn-beijing.aliyuncs.com/20240321/8307fa769212482fb3471d60a17a31e1.docx',
          '阿拉教师码用户协议.docx'
        )
      "
      >《阿拉教师码用户协议》</span
    >、<span
      class="text-[#409EFF] cursor-pointer"
      @click="
        downloadFile(
          'https://ddup-education.oss-cn-beijing.aliyuncs.com/20240321/4493a9c0a19b465b94e0e21a9ba72b53.docx',
          '阿拉教师码用户隐私协议.docx'
        )
      "
      >《阿拉教师码用户隐私协议》</span
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
  <div class="text-lg leading-7 mt-2">申报流程如下所示：</div>
  <img
    class="w-[80%] block mb-10 mt-4"
    src="../assets/images/entry-materials/process.png"
    alt="流程图"
  />
</template>

<script setup lang="ts">
import { downloadFile } from "@/utils";
</script>

<style scoped></style>
