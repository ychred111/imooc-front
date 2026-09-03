<template>
  <div>
    <m-dialog title="111" v-model="isDialogVisible">测试 </m-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isDialogVisible = ref(true)
</script>
<style scoped lang="less"></style>
