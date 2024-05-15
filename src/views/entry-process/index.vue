<template>
  <div v-if="loading">
    <div class="px-5 py-2.5 font-semibold text-lg">流程进度</div>
    <entry-agreement :active="active" />
    <component :is="statusComponent" @stepNext="handleNext" />
  </div>
</template>

<script setup lang="ts">
import EntryAgreement from "./components/entry-agreement.vue";
import EntryMaterials from "./components/entry-materials.vue";
import EntryInformed from "./components/entry-informed.vue";
import EntryResult from "./components/entry-result.vue";
import { MaterialApplyState, State } from "@/enums";
import { useUserInfo } from "@/store";
import { ref, computed, onMounted } from "vue";
import { apiUserGet } from "@/api/user";
import { useRouter } from "vue-router";

const router = useRouter();
let user = useUserInfo();
const loading = ref(false);
const statusComponent = computed(() => {
  let component;
  switch (user.state) {
    case State.know:
      component = EntryInformed;
      break;
    case State.declare:
      component = EntryMaterials;
      break;
    case State.successes:
    case State.error:
    case State.ShortlistingError:
    case State.ShortlistingSuccess:
      component = EntryResult;
      break;
    default:
      console.error("Unknown Status");
      break;
  }
  return component;
});

const active = ref<number>(0);
const initActive = () => {
  switch (user.state) {
    case State.know:
      return 0;
    case State.declare:
      return user.materialApplyState!;
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

const handleNext = (state: State, materialApplyState: MaterialApplyState) => {
  user.materialApplyState = materialApplyState;
  user.state = state;
  active.value = initActive();
};

onMounted(async () => {
  if (user.id) {
    const { data } = await apiUserGet(user.id);
    if (data) {
      user.$state = data;
    } else {
      user.$reset();
      router.replace("/login");
    }
  } else {
    user.$reset();
    router.replace("/login");
  }
  // user.state = 2;
  // user.materialApplyState = 1;
  active.value = initActive();
  loading.value = true;
});
</script>

<style scoped lang="scss"></style>
