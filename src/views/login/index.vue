<script lang="ts">
import CInput from "@/components/controls/input/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CCard from "@/components/surfaces/card/index.vue";

export default {
  name: "LoginView",
  components: { CInput, CButton, CCard },
};
</script>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const store = useStore();
const router = useRouter();
const route = useRoute();

const password = ref("");
const passwordErrorMessage = ref("");
const isLoggingIn = computed(() => store.state.user.isLoggingIn);

const clearPasswordErrorMessage = () => {
  passwordErrorMessage.value = "";
};

const onLoginFormSubmit = () => {
  store
    .dispatch("user/login", password.value)
    .then(() => {
      router.push(route.query.redirect?.toString() || "/");
    })
    .catch((errorMessage) => {
      password.value = "";
      passwordErrorMessage.value = errorMessage;
    });
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
