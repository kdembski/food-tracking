<script lang="ts">
import CMembers from "@/components/utils/members/index.vue";

export default {
  name: "CDisplayMembers",
  components: { CMembers },
};
</script>

<script setup lang="ts">
import { Member } from "@/types/members/member";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const props = defineProps({
  memberIds: {
    type: Array,
    default: () => [],
  },
});

const members = computed(() => {
  return store.state.member.all.filter((member: Member) =>
    props.memberIds.some((id) => id === member.id)
  );
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
