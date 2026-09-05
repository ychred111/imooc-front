<template>
  <div
    class="min-w-[180px] bg-white dark:bg-zinc-800 rounded-full shadow flex items-center justify-between px-2 py-1"
  >
    <!-- <slot /> -->
    <m-trigger-menu-item
      icon="home"
      iconClass="fill-zinc-900 dark:fill-zinc-200'"
    >
      首页
    </m-trigger-menu-item>

    <m-trigger-menu-item
      v-if="$store.getters.token"
      icon="vip"
      iconClass="fill-zinc-400 dark:fill-zinc-500"
      textClass="text-zinc-400 dark:text-zinc-500"
      @click="onVipClick"
    >
      vip
    </m-trigger-menu-item>

    <m-trigger-menu-item
      icon="profile"
      iconClass="fill-zinc-400 dark:fill-zinc-500"
      textClass="text-zinc-400 dark:text-zinc-500"
      @click="onMyClick"
    >
      我的
    </m-trigger-menu-item>
  </div>
</template>

<script setup>
import triggerMenuItem from '../trigger-menu-item/index.vue'

const onVipClick = () => {}

const onMyClick = () => {}
</script>
