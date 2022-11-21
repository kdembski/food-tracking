<script lang="ts">
export default {
  name: "CMembers",
};
</script>

<script setup lang="ts">
import { Member } from "@/types/member";

const props = defineProps({
  members: {
    type: Array as () => Member[],
    default: () => [],
  },
});

const getItemLabel = (member: Member) => {
  return member.name[0].toUpperCase();
};

const getItemBackgroundColor = (member: Member) => {
  const color = member.id === 1 ? "#80d7e0" : "#f0b1b1";
  return color;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
