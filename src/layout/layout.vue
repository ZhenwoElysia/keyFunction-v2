<script setup lang="ts">
import layoutTop from './top/layoutTop.vue';
import layoutBottom from './bottom/layoutBottom.vue';
</script>

<template>
  <div class="top">
    <layoutTop></layoutTop>
  </div>
  <router-view />
  <div class="bottom">
    <layoutBottom></layoutBottom>
  </div>
</template>

<style lang="scss" scoped>
.top {
  width: 100%;
}
</style>
