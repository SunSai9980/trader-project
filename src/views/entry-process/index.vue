<template>
  <div v-if="loading">
    <div class="px-5 py-2.5 font-semibold text-lg">流程进度</div>
    <entry-agreement :active="active" />
    <component :is="statusComponent" @stepNext="handleNext" />
  </div>

  <!-- <entry-informed /> -->
</template>

<script setup lang="ts">
import EntryAgreement from "./components/entry-agreement.vue";
import EntryMaterials from "./components/entry-materials.vue";
import EntryInformed from "./components/entry-informed.vue";
import EntryResult from "./components/entry-result.vue";
import { Commitment, State } from "@/enums";
import { useUserInfo } from "@/store";
import { ref, computed, onMounted } from "vue";

const { user, setUserInfo } = useUserInfo();
const loading = ref(false);
const statusComponent = computed(() => {
  let component;
  switch (user.commitment) {
    case Commitment.know:
      component = EntryInformed;
      break;
    case Commitment.declare:
    case Commitment.successes:
    case Commitment.error:
      component = EntryMaterials;
      break;
    case Commitment.ShortlistingError:
    case Commitment.ShortlistingSuccess:
      component = EntryResult;
      break;
    default:
      console.error("Unknown Status");
      break;
  }
  return component;
});

const active = ref<number>(0);

const handleNext = (commitment: Commitment, state: State) => {
  console.log("next");
  if (active.value++ > 3) active.value = 0;
  setUserInfo("commitment", commitment);
  setUserInfo("state", state);
};
const initActive = () => {
  switch (user.commitment) {
    case Commitment.know:
      return 0;
    case Commitment.declare:
      return user.state!;
    case Commitment.successes:
    case Commitment.error:
      return 2;
    case Commitment.ShortlistingError:
    case Commitment.ShortlistingSuccess:
      return 3;
    default:
      return 0;
  }
};

onMounted(() => {
  active.value = initActive();
  loading.value = true;
});
</script>

<style scoped lang="scss"></style>
