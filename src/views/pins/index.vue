<template>
  <!-- 这是点击item之后生成的页面 -->
  <div class="fixed left-0 top-0 w-screen h-screen text-xl bg-slate-500 z-20">
    <pins-vue :id="$route.params.id"></pins-vue>
  </div>
</template>

<script setup>
import pinsVue from './pins.vue'
// 放大镜式图片详情跳转动画实现思想：
// 利用 history.pushState 改变 URL（但不刷新页面），
// 配合 Vue 的 <transition> 和 GSAP 动画库，
// 从点击的起始点“生长”出一个全屏详情页
// 渲染 pins 页面
// 因为移动端跟pc端展示的效果不一样，所以要分开处理
// 移动端：navbar部分
defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>
