<template>
  <component
    :detailInfo="detailInfo!"
    :is="components"
    @goList="goList"
    @goDetails="goDetails"
    :passNum="passNum"
    :successesNum="successesNum"
    :pendingNum="pendingNum"
    @addNum="addNum"
    @subNum="subNum"
    @updateDetailInfoState="updateDetailInfoState"
  />
</template>

<script setup lang="ts">
import MerchantList from "./components/merchant-list.vue";
import MerchantDetails from "./components/merchant-details.vue";
import { User } from "@/types";
import { apiUserList } from "@/api/user";
import { MaterialApplyState, State } from "@/enums";

const components = shallowRef(MerchantList);
const detailInfo = ref<Required<User>>();

const goList = () => {
  components.value = MerchantList;
};
const goDetails = (data: Required<User>) => {
  components.value = MerchantDetails;
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
    size: 100,
    states: [2, 3, 4, 5, 6],
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
