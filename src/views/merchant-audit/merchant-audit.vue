<template>
  <component
    :detailInfo="detailInfo!"
    :is="components"
    v-model:enterprise-name="enterpriseName"
    v-model:state="state"
    v-model:currentPage="currentPage"
    v-model:pageSize="pageSize"
    v-model:total="total"
    @goList="goList"
    @goDetails="goDetails"
    :passNum="passNum"
    :successesNum="successesNum"
    :pendingNum="pendingNum"
    @addNum="addNum"
    @subNum="subNum"
    @updateDetailInfoState="updateDetailInfoState"
    :isChairman="isChairman"
  />
</template>

<script setup lang="ts">
import MerchantList from "./components/merchant-list.vue";
import MerchantDetails from "./components/merchant-details.vue";
import { User } from "@/types";
import { apiUserList } from "@/api/user";
import { MaterialApplyState, State, CooperateType } from "@/enums";
import { CHAIRMAN } from "@/constants";
import { useRoute } from "vue-router";

const mobile = useRoute().query.mobile as string;
const isChairman = computed((): boolean => {
  return mobile ? CHAIRMAN.includes(mobile) : false;
});

const components = shallowRef(MerchantList);
const detailInfo = ref<Required<User>>();
const enterpriseName = ref<string>("");
const state = ref<State | undefined>(undefined);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);

const goList = () => {
  components.value = MerchantList;
};
const goDetails = (data: Required<User>) => {
  components.value = MerchantDetails as unknown as typeof MerchantList;
  detailInfo.value = data;
};
const pendingNum = ref<number>(0);
const passNum = ref<number>(0);
const successesNum = ref<number>(0);
const addNum = (state: State) => {
  switch (state) {
    case State.declare:
      pendingNum.value += 1;
      break;
    case State.successes:
      passNum.value += 1;
      break;
    case State.ShortlistingSuccess:
      successesNum.value += 1;
      break;
  }
};
const updateDetailInfoState = (state: State) => {
  if (!detailInfo.value) return;
  detailInfo.value.state = state;
};
const subNum = (state: State) => {
  switch (state) {
    case State.declare:
      pendingNum.value -= 1;
      break;
    case State.successes:
      passNum.value -= 1;
      break;
    case State.ShortlistingSuccess:
      successesNum.value -= 1;
      break;
  }
};
const stateNum = async () => {
  const {
    data: { records },
  } = await apiUserList({
    deleted: false,
    materialApplyState: MaterialApplyState.fulfil,
    current: 1,
    size: 150,
    descs: "modify_time",
    states: [2, 3, 5],
    cooperateTypes: isChairman.value
      ? [
          CooperateType.BirthdayBenefits,
          CooperateType.ConsumptionAssistance,
          CooperateType.HuishiCooperation,
          CooperateType.SunshineBenefits,
        ]
      : undefined,
  });
  records.forEach((record) => {
    switch (record.state) {
      case State.declare:
        pendingNum.value += 1;
        break;
      case State.successes:
        passNum.value += 1;
        break;
      case State.ShortlistingSuccess:
        successesNum.value += 1;
        break;
    }
  });
};
onMounted(async () => {
  await stateNum();
});
</script>

<style scoped lang="scss"></style>
