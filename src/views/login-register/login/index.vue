<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <!-- 头部区域 -->
    <header-vue> </header-vue>
    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <!-- 标题 -->
      <h3
        class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block"
      >
        账号登陆
      </h3>

      <!-- 表单 -->
      <vee-form @submit="onLoginHandler">
        <!--用户名  -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          :rules="validateUsername"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          v-model="loginForm.username"
        >
        </vee-field>
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        >
        </vee-error-message>

        <!-- ------------------------ -->
        <!-- 密码 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="password"
          :rules="validatePassword"
          type="password"
          placeholder="密码"
          autocomplete="on"
          v-model="loginForm.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        >
        </vee-error-message>

        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
            @click="onToRegister"
          >
            去注册
          </a>
        </div>
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :loading="loading"
          :isActiveAnim="false"
        >
          登录
        </m-button>
      </vee-form>

      <!-- 第三方登陆 -->
      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <m-svg-icon class="w-4 cursor-pointer" name="qq"></m-svg-icon>
        <!-- 微信 -->
        <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
      </div>

      <!-- 人类行为验证模块 -->
      <slider-captcha
        v-if="isSliderCaptchaVisible"
        @close="isSliderCaptchaVisible = false"
        @success="onCaptchaSuccess"
      ></slider-captcha>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import headerVue from '../components/header.vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import { validateUsername, validatePassword } from '../validate.js'
import SliderCaptcha from './slider-captcha.vue'
import { LOGIN_TYPE_USERNAME } from '@/constants/index.js'
import { useRouter } from 'vue-router'

// 用户输入的用户名跟密码
const loginForm = ref({
  username: '',
  password: ''
})

import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const loading = ref(false)
// 控制 sliderCaptcha 展示
const isSliderCaptchaVisible = ref(false)
// 登陆触发
const onLoginHandler = () => {
  isSliderCaptchaVisible.value = true
  console.log('1111')
}

/**
 * 人类行为验证通过
 */
const onCaptchaSuccess = async () => {
  // 登录操作
  onLogin()
  store.dispatch('user/profile')
}

/**
 * 用户登录行为
 */
const onLogin = async () => {
  loading.value = true
  //   用户登陆执行
  try {
    await store.dispatch('user/login', {
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
</script>
<style scoped lang="less"></style>
