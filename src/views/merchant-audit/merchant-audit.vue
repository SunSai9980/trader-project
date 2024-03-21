<template>
  <component :is="components" @goList="goList" @goDetails="goDetails" />
</template>

<script setup lang="ts">
import MerchantList from "./components/merchant-list.vue";
import MerchantDetails from "./components/merchant-details.vue";

const components = shallowRef(MerchantList);

const goList = () => {
  components.value = MerchantList;
};
const goDetails = () => {
  components.value = MerchantDetails;
};
</script>

<style scoped lang="scss"></style>
