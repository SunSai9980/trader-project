<template>
  <div>
    <div class="px-5 py-2 font-semibold text-lg">流程进度</div>
    <el-divider class="!mt-0" />
    <EntryAgreement :active="active" class="border-none !pt-0" />
    <div class="bg-#f0f2f5 pt-3">
      <div class="bg-#fff">
        <div class="px-5 py-2 flex w-full items-center">
          <span class="text-base font-bold mr-3">详情</span>
          <div class="flex flex-1 justify-between items-center">
            <div class="flex">
              <el-tag type="success">核验通过</el-tag>
              <el-tag type="success">入驻成功</el-tag>
              <el-tag type="danger">核验失败</el-tag>
              <el-tag type="danger">入驻失败</el-tag>
            </div>
            <div>
              <el-button @click="$emit('goList')">回到上一页</el-button>
              <el-button type="primary">通过</el-button>
              <el-button type="danger" plain>驳回</el-button>
              <el-button type="primary">入驻处理</el-button>
            </div>
          </div>
        </div>
        <el-divider class="!mt-0" />
        <div class="px-5">
          <div class="font-semibold text-xs">负责人信息</div>
          <el-row class="mt-5" :gutter="10">
            <el-col :span="8">
              <div class="flex text-sm">
                <div>姓名：</div>
                <div class="text-#5a5a5a">{{ detailInfo!.name }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flex text-sm">
                <div>手机号：</div>
                <div class="text-#5a5a5a">{{ detailInfo!.mobile }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flex text-sm">
                <div>邮箱：</div>
                <div class="text-#5a5a5a">{{ detailInfo!.email }}</div>
              </div>
            </el-col>
          </el-row>
          <div class="flex text-sm mt-8">
            <div>身份证：</div>
            <div class="mr-10">
              <el-image
                style="width: 150px; height: 150px"
                :src="srcList[0]"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="srcList"
                :initial-index="0"
                fit="cover"
              />
              <div class="text-#5a5a5a text-center">人像面</div>
            </div>
            <div>
              <el-image
                style="width: 150px; height: 150px"
                :src="srcList[1]"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="srcList"
                :initial-index="1"
                fit="cover"
              />
              <div class="text-#5a5a5a text-center">国徽面</div>
            </div>
          </div>

          <div class="font-semibold text-xs mt-10">企业信息</div>
          <el-row class="mt-5" :gutter="10">
            <el-col :span="8">
              <div class="flex text-sm">
                <div>企业名称：</div>
                <div class="text-#5a5a5a">{{ detailInfo!.enterpriseName }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flex text-sm">
                <div>社会统一信用代码：</div>
                <div class="text-#5a5a5a">{{ detailInfo!.creditCode }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flex text-sm">
                <div>推荐人/推荐单位：</div>
                <div class="text-#5a5a5a">
                  {{ detailInfo!.recommendUser || "-" }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row class="mt-8 mb-20">
            <el-col :span="8">
              <div class="flex text-sm">
                <div>企业营业执照：</div>
                <el-image
                  style="width: 150px; height: 150px"
                  :src="srcList[2]"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="srcList"
                  :initial-index="2"
                  fit="cover"
                />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flex text-sm">
                <div>食品经营许可证：</div>
                <el-image
                  style="width: 150px; height: 150px"
                  :src="srcList[3]"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="srcList"
                  :initial-index="3"
                  fit="cover"
                />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flex text-sm">
                <div>阳光福利商户承诺书：</div>
                <span
                  class="text-[#409EFF] cursor-pointer"
                  @click="downloadFile(commitment.url, commitment.name)"
                  >{{ commitment.name }}</span
                >
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EntryAgreement from "../../entry-process/components/entry-agreement.vue";
import type { User } from "@/types";
import { State } from "@/enums";
import { downloadFile } from "@/utils";

defineEmits(["goList", "goDetails", "addNum", "subNum"]);
const props = defineProps<{
  detailInfo?: Required<User>;
  successesNum: number;
  passNum: number;
  pendingNum: number;
}>();

const active = ref(0);
let commitment = ref<{ name: string; url: string }>({ name: "", url: "" });
try {
  commitment.value = JSON.parse(props.detailInfo?.commitment!);
} catch (e) {
  commitment.value = {
    name: "承诺书." + props.detailInfo?.commitment!.split(".").pop(),
    url: props.detailInfo?.commitment!,
  };
}

const initActive = () => {
  console.log(props.detailInfo!.state);
  switch (props.detailInfo!.state) {
    case State.know:
      return 0;
    case State.declare:
      return props.detailInfo!.materialApplyState!;
    case State.successes:
    case State.error:
      return 3;
    case State.ShortlistingError:
    case State.ShortlistingSuccess:
      return 4;
    default:
      return 0;
  }
};
const srcList = reactive<string[]>([
  props.detailInfo?.idCardFront!,
  props.detailInfo?.idCardOpposite!,
  props.detailInfo?.businessLicense!,
  props.detailInfo?.operatePermit!,
]);

onMounted(() => {
  active.value = initActive();
});
</script>

<style scoped></style>
