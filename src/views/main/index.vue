<template>
  <!-- 这个页面文件是pc端主页面： -->
  <!-- 包含以下部分 -->
  <!-- 导航栏 -->
  <!-- 图片数据 -->
  <!-- list 》 index 》item -->

  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500">
    <!-- 导航栏 -->
    <navigation-vue></navigation-vue>
    <!-- ------------------------------- -->

    <!-- 图片 -->
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list-vue></list-vue>
    </div>
  </div>
</template>
<script setup>
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
</script>
