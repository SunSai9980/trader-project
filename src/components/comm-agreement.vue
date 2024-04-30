<template>
  <div text-lg leading-7>欢迎你使用阿拉教师码商户平台！</div>
  <div text-base leading-7 mt-2>
    申请商户合作认证前，请仔细阅读并同意以下内容及<span
      class="text-[#409EFF] cursor-pointer"
      @click="
        downloadFile(
          'https://ddup-education.oss-cn-beijing.aliyuncs.com/file/%E9%98%BF%E6%8B%89%E6%95%99%E5%B8%88%E7%A0%81%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE240427.pdf',
          '阿拉教师码用户协议.pdf'
        )
      "
      >《阿拉教师码用户协议》</span
    >、<span
      class="text-[#409EFF] cursor-pointer"
      @click="
        downloadFile(
          'https://ddup-education.oss-cn-beijing.aliyuncs.com/file/%E9%98%BF%E6%8B%89%E6%95%99%E5%B8%88%E7%A0%81%E7%94%A8%E6%88%B7%E9%9A%90%E7%A7%81%E5%8D%8F%E8%AE%AE0425.pdf',
          '阿拉教师码用户隐私协议.pdf'
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
    拟认证主体提交给阿拉教师码平台的认证资料真实⽆误，并不可撤销地授权阿拉教师码及其委托的任何第三⽅审核机构对提交的资料进⾏甄别核实。
  </div>
  <div text-base leading-7>
    3.
    拟合作主体在申请商户合作过程中填写并向阿拉教师码提交的认证联系⼈（包括后续不时变更的⼈员）为拟合作主体指定的认证联系⼈员，并特此授权由该指定⼈员以拟合作主体的名义负责该主体商户账号的运营管理，同一认证联系人仅可认证一个主体账号。认证联系人的所有操作行为，均代表拟合作主体，拟合作主体均需承担一切责任。
  </div>
  <div text-base leading-7>
    4.
    申报资料的审核周期为15至20个工作日，审核结果将以邮箱或短信形式告知。平台合作项目需提前至少15个工作日发起申请。
  </div>
  <div text-base leading-7>
    5.
    拟合作主体如违反上述承诺，均需承担一切责任，对阿拉教师码平台或第三方造成损失的，须赔偿损失。
  </div>
</template>

<script setup lang="ts">
import { downloadFile } from "@/utils";
</script>

<style scoped></style>
