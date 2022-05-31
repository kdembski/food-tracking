<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/">About</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
*,
*:before,
*:after {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
