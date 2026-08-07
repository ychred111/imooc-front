<template>
  <div class="h-screen">
    <header-vue class="h-header"></header-vue>
    <main-vue class="h-main"></main-vue>
    <floting-vue> </floting-vue>
  </div>
</template>

<script setup>
import headerVue from './components/header/index.vue'
import flotingVue from './components/floting.vue'
import mainVue from './components/main.vue'
</script>
<style scoped lang="less"></style>
