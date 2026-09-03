<template>
  <div
    class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 overflow-auto xl:pt-1"
  >
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4 xl:py-2"
    >
      <!-- 导航栏部分 -->
      <!-- 移动端 navbar -->
      <m-navbar sticky v-if="isMobileTerminal" :clickLeft="onNavbarLeftClick">
        个人资料
      </m-navbar>
      <!-- pc 端 navbar -->
      <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">
        个人资料
      </div>

      <!-- 内容部分 --------------------- -->
      <div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:w-2/3 xl:pb-0">
        <!-- 头像 -->
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
          <span
            class="w-8 inline-block mb-2 font-bold text-sm dark:text-zinc-300 xl:block xl:mx-auto"
            >我的头像</span
          >
          <!-- 头像部分 -->
          <div
            class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-[50%] xl:translate-x-[-50%]"
            @click="onAvatarClick"
          >
            <img
              v-lazy
              :src="$store.getters.userInfo.avatar"
              alt=""
              class="rounded-[50%] w-full h-full xl:inline-block"
            />
            <div
              class="absolute top-0 rounded-[50%] w-full h-full bg-[rgba(0,0,0,.4)] hidden xl:group-hover:block"
            >
              <m-svg-icon
                name="change-header-image"
                class="w-2 h-2 m-auto mt-2"
              ></m-svg-icon>
              <div
                class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5"
              >
                点击更换头像
              </div>
            </div>
          </div>
          <!-- 隐藏域 -->
          <input
            v-show="false"
            ref="inputFileTarget"
            type="file"
            accept=".png, .jpeg, .jpg, .gif"
            @change="onSelectImgHandler"
          />
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
            支持 jpg、png、jpeg 格式大小 5M 以内的图片
          </p>
        </div>
        <!-- 用户名 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >用户名</span
          >
          <m-input
            v-model="userInfo.nickname"
            class="w-full"
            type="text"
            max="20"
          ></m-input>
        </div>
        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >职位</span
          >
          <m-input
            v-model="userInfo.title"
            class="w-full"
            type="text"
          ></m-input>
        </div>
        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >公司</span
          >
          <m-input
            v-model="userInfo.company"
            class="w-full"
            type="text"
          ></m-input>
        </div>
        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人主页</span
          >
          <m-input
            v-model="userInfo.homePage"
            class="w-full"
            type="text"
          ></m-input>
        </div>
        <!-- 个人介绍 -->
        <div class="py-1 xl:flex xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人介绍</span
          >
          <m-input
            v-model="userInfo.introduction"
            class="w-full"
            type="textarea"
            max="50"
          ></m-input>
        </div>
        <!-- 保存修改 -->
        <m-button
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          :loading="loading"
          @click="onChangeProfile"
          >保存修改</m-button
        >
        <!-- 移动端退出登录 -->
        <m-button
          v-if="isMobileTerminal"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onLogoutClick"
        >
          退出登录
        </m-button>
      </div>
    </div>

    <!-- PC 端 -->
    <m-dialog v-if="!isMobileTerminal" v-model="isDialogVisible">
      <ChangeAvatar
        :blob="currentBolb"
        @close="isDialogVisible = false"
      ></ChangeAvatar>
    </m-dialog>

    <!-- 移动端 -->
    <m-popup
      v-else
      :class="{ 'h-screen': isDialogVisible }"
      v-model="isDialogVisible"
    >
      <ChangeAvatar
        :blob="currentBolb"
        @close="isDialogVisible = false"
      ></ChangeAvatar>
    </m-popup>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
// import { confirm } from '@/libs'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed, nextTick, onMounted, watch } from 'vue'
import ChangeAvatar from './components/change-avatar.vue'
// import { putProfile } from '@/api/sys'
// import { message } from '@/libs'

const store = useStore()
const router = useRouter()
// 隐藏域
const inputFileTarget = ref(null)

/**
 * 更换头像点击事件
 */
const onAvatarClick = () => {
  inputFileTarget.value.click()
}

/**
 * 头像选择之后的回调
 */

// 控制 dialog 的显示
const isDialogVisible = ref(false)

// 选中的图片
const currentBolb = ref('')
const onSelectImgHandler = () => {
  // 获取选中的文件
  const imgFile = inputFileTarget.value.files[0]
  //   生成 blod 对象
  const blob = URL.createObjectURL(imgFile)
  console.log(blob)
  currentBolb.value = blob
  isDialogVisible.value = true
}

/**
 * 移动端后退处理
 */
const onNavbarLeftClick = () => {
  router.back()
}

/**
 * 移动端：退出登录
 */
const onLogoutClick = () => {
  confirm('确定要退出登录吗？').then(() => {
    store.dispatch('user/logout')
  })
}

// 数据本地的双向同步方案1:
// 为什么要拆开 v-model
// Vuex 的铁律是：“修改 State 的唯一途径是提交 Mutation。”
// 如果直接用 v-model="$store.getters.userInfo.nickname"，
// 相当于在组件内部直接去改全局数据，Vuex 的开发者工具就追踪不到数据是怎么变的（俗称“破窗效应”），在大型项目里极易产生隐秘的 Bug。
// :modelValue：这是下拉箭头（单向流入），负责把 Vuex 里存的名字显示在输入框里。
// @update:modelValue：这是爬坡箭头（单向流出），当你在输入框里敲键盘时，m-input 内部会抛出最新值（$event），此时我们来拦截它。
// 为什么用展开符 ...？
// 因为 Vuex 里的数据是用户对象的整体，你不能只改 nickname 而丢掉 avatar 和 title。展开旧对象保证了其他字段不丢失。
// 为什么用 [key]？
// 实现了完美复用。以后你想改 title，只需要调 changeStoreUserInfo('title', '新值') 即可，不需要为每个字段写一个专门的函数。

// const changeStoreUserInfo = (key, value) => {
//   store.commit('user/setUserInfo', {
//     ...store.getters.userInfo, // 1. 把旧的 userInfo 数据展开
//     [key]: value // 2. 利用计算属性名，只覆盖修改的那一个字段
//   })
// }

// 修改个人信息
// const loading = ref(false)
// const onChangeProfile = async () => {
//   loading.value = true
//   //   把 store 里面 更新的数据提交到后端
//   const res = await putProfile(store.getters.userInfo)
//   console.log(res)
//   message('success', '用户信息修改成功')
//   loading.value = false
// }

// 数据本地的双向同步方案2:
// 创建一个数据的本地副本，把vuex里面的数据给他
// 然后再把vuex里面的数据提交给后端
// 提交到后端之后再把用户输入到数据保存到vuex里面

// 1. 本地草稿箱（用来绑定 v-model，允许用户随便改）
// 2. 自动回显：只要 Store 里的数据变了，就同步到本地草稿箱（并触发保存按钮）
// watch(
//   () => store.getters.userInfo,
//   (newVal) => {
//     // 注意：这里用展开符 ...，把 Store 数据放进草稿箱
//     userInfo.value = { ...newVal }
//   },
//   { immediate: true } // 页面一加载，立刻执行一次
// )

const loading = ref(false)
const userInfo = ref(store.getters.userInfo)
const onChangeProfile = async () => {
  loading.value = true
  // 1. 发送请求：把本地草稿箱的值发给后端
  await putProfile(userInfo.value)
  message('success', '用户信息修改成功')
  // 2. 更新全局：请求成功后，才把新值正式同步给 Vuex
  store.commit('user/setUserInfo', userInfo.value)
  // 3. 关闭加载
  loading.value = false
}
</script>
<style scoped lang="less"></style>
