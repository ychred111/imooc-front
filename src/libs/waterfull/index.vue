<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{
      height: columnHeightObj + 'px'
    }"
  >
    <!-- 数据渲染 -->
    <!-- 以为列数不确定，所以需要根据列数计算每列的宽度，所以等待列宽计算完成，并且有了数据源之后进行渲染 -->
    <!-- 只有 columnWidth 计算完成且 data 有数据时才渲染列表 -->
    <!-- 每个子项使用 absolute 定位，通过 left 和 top 控制位置 -->
    <template v-if="columnWidth && data.length">
      <!-- 通过动态的style 来去计算对应的列宽 left top -->
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfull-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <!-- 暴露 item、width、index 给父组件自定义内容 -->
        <slot :item="item" :width="columnWidth" :index="index"> </slot>
      </div>
    </template>

    <!-- ------------------------ -->
    <!-- 加载中 -->
    <div v-else>加载中</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    default: 2,
    type: Number
  },
  // 列间距
  columnSpacing: {
    default: 20,
    type: Number
  },
  // 行间距
  rowSpacing: {
    default: 20,
    type: Number
  },
  //   是否需要图片预读取
  picturePreReading: {
    type: Boolean,
    default: true
  }
})

// 页面加载
//     ↓
// onMounted 触发
//     ↓
// ① 计算容器宽度 (useContainerWidth)
//     ↓
// ② 计算列宽 (useColumnWidth)
//     ↓
// ③ 构建列高对象 (useColumnHeightObj)
//     ↓
// ④ 遍历数据，计算每个 item 的位置 位置分配
//     ↓
// ⑤ 动态更新 渲染到页面
// ------------------------------------------
// 列高记录
// 记录每列当前高度
// 在计算每个子项位置时，会选择高度最小的列插入新项
// 容器的总高度 = 最高的这一列的高度
const containerHeight = ref(0)
// 记录每列高度的容器。key：所在列 val：列高
const columnHeightObj = ref({})
/* 构建记录各列的高度的对象。
 */
// 遍历每一列 记录每一列的高度
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}
// ------------------------------------------

// 容器实例
const containerTarget = ref(null)
// 容器总宽度(不包含 padding、margin、border)
const containerWidth = ref(0)
// 容器左边距，计算 item_left 时，需要使用定位
const containerLeft = ref(0)

/**
 * 计算容器宽度
 */
// 获取容器实际的内容宽度（去除 padding）
// 同时记录 paddingLeft 用于后续子项定位

const useContainerWidth = () => {
  // mdn 提供的方法getComputedStyle（元素，null）用来获取元素最终计算后的样式
  // 返回一个包含所有 CSS 属性值的对象，这些值是浏览器实际渲染时使用的最终值。
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器宽度 （内容的宽度）
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseInt(paddingLeft) -
    parseInt(paddingRight)
}

// 列宽 = （容器的宽度 - 所有列间距的宽度） / 列数
const columnWidth = ref(0)
// 列间距合计
const columnSpacingTotal = computed(() => {
  // 如果是5列，则存在 4 个列间距 个数 x 间距
  return (props.column - 1) * props.columnSpacing
})

/**
 * 开始计算
 */
const useColumnWidth = () => {
  // 获取容器宽度
  useContainerWidth()
  // 计算列宽 列宽 = （容器的宽度 - 所有列间距的宽度） / 列数
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
  // 计算列宽
  useColumnWidth()
  console.log(columnWidth.value)
})
</script>
<style scoped lang="less"></style>
