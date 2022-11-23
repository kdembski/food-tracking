<script lang="ts">
export default {
  name: "CMembers",
};
</script>

<script setup lang="ts">
import { Member } from "@/types/member";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const props = defineProps({
  members: {
    type: Array as () => Member[],
    default: () => [],
  },
});

const getItemLabel = (member: Member) => {
  return member.name[0].toUpperCase();
};

const isDarkModeEnabled = computed(() => store.getters["isDarkModeEnabled"]);

const getItemBackgroundColor = (member: Member) => {
  if (isDarkModeEnabled.value) {
    return member.id === 1 ? "#4C8186" : "#A87B7B";
  }
  return member.id === 1 ? "#80d7e0" : "#f0b1b1";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
