<script lang="ts">
import CMembers from "@/components/utils/members/index.vue";
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "CSelectMembers",
  components: { CMembers, CSkeletonLoader },
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  isLoading: {
    type: Boolean,
    deafult: false,
  },
  selectedMembers: {
    type: Array as () => number[],
    default: () => [],
  },
});

const emit = defineEmits<{
  (e: "update:selectedMembers", members: number[]): void;
}>();

const members = computed(() => store.state.member.all);

const _selectedMembers = computed({
  get(): number[] {
    return props.selectedMembers;
  },
  set(members: number[]) {
    emit("update:selectedMembers", members);
  },
});

const getItemId = (id: number) => {
  const attrs = useAttrs();

  if (attrs.id) {
    return attrs.id + "-member-" + id;
  }
  return "member-" + id;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
