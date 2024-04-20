<template>
  <div text-lg leading-7>欢迎使用阿拉教师码合作平台！</div>
  <div text-base leading-7 mt-2>
    申请 “阳光福利” 商户合作前，请仔细阅读并同意以下内容及<span
      class="text-[#409EFF] cursor-pointer"
      @click="
        downloadFile(
          'https://ddup-education.oss-cn-beijing.aliyuncs.com/commodity/%E9%98%BF%E6%8B%89%E6%95%99%E5%B8%88%E7%A0%81%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE0825.pdf',
          '阿拉教师码用户协议.pdf'
        )
      "
      >《阿拉教师码用户协议》</span
    >、<span
      class="text-[#409EFF] cursor-pointer"
      @click="
        downloadFile(
          'https://ddup-education.oss-cn-beijing.aliyuncs.com/commodity/%E9%98%BF%E6%8B%89%E6%95%99%E5%B8%88%E7%A0%81%E7%94%A8%E6%88%B7%E9%9A%90%E7%A7%81%E5%8D%8F%E8%AE%AE0425.pdf',
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
    拟合作主体提交给阿拉教师码平台的核验资料真实⽆误，并不可撤销地授权阿拉教师码及其委托的任何第三⽅审核机构对提交的资料进⾏甄别核实。
  </div>
  <div text-base leading-7>
    3.
    拟合作主体在申请商户合作过程中填写并向阿拉教师码提交的申请人（包括后续不时变更的⼈员）为拟合作主体指定的负责人，并特此授权由该指定⼈员以拟合作主体的名义负责该主体商户账号的运营管理，同一申请人仅可认证一个主体账号。申请人的所有操作行为，均代表拟合作主体，拟合作主体均需承担一切责任。
  </div>
  <div text-base leading-7>
    4.
    合作商户要求：非外资完全控股企业，经营年限满五年及以上，具备独立法人资格和市场经营需要的资质，有符合国家卫生及食品标准的经营场所，宁波大市范围内有三家及以上的线下门店，支持供应链配送和物流系统。
  </div>
  <div text-base leading-7>
    5.
    拟合作主体如违反上述承诺，均需承担一切责任，对阿拉教师码平台或第三方造成损失的，须赔偿损失。
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
