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
    <div v-else>加载中...</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue'
import {
  getImgElements,
  getAllImg,
  onComplateImgs,
  getMinHeightColumn,
  getMinHeight,
  getMaxHeight
} from './utils'
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
// 所以需要初始化并维护一个用来记录每一列当前高度的数据容器
// 在瀑布流算法中，每次插入新卡片时，都需要知道当前哪一列是最矮的。这个对象能快速查询到每列的高度
// 容器的总高度 = 最高的这一列的高度
const containerHeight = ref(0)
// 记录每列高度的容器。key：所在列 val：列高
// 它的 key（键）代表第几列，value（值）代表该列当前已经累积的高度

const columnHeightObj = ref({})
/* 构建记录各列的高度的对象。
 */
// 遍历每一列 记录每一列的高度
const useColumnHeightObj = () => {
  // 先把对象清空，避免之前残留的数据影响本次计算
  // （这是一种极其重要的“防污染”操作，尤其在数据发生更新时）。
  columnHeightObj.value = {}
  // 遍历列数 把列数当作下标
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

// useColumnHeightObj()
// console.log(columnHeightObj.value)

// ------------------------------------------

//计算列宽 ：每一个列的宽度
// 列宽 = （整个容器的宽度 - 间隔总数）/ 列数

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
  // 容器宽度 （内容的宽度）= 容器的宽度 - 左编剧 -右边距
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
  // console.log(columnWidth.value)
})

// ------------------------------------------
// 流程：
// 获取item dom =》 itemElements
// 获取item 里面的 img imgElements
// 获取 img 里面的链接 放到一个数组里面
//  把img链接数组传到onComplateImgs里面监听是否加载完成
// 因为第一次在 Vue 里渲染 v-for 循环的时候，页面上的卡片实际上是一个“占位符”，因为图片还没下载好，高度是 0 或者仅仅是默认占位高度
// 如果你没有执行上面的提取和监听，直接去算位置（直接去拿 el.offsetHeight）。
// 你会发现算出来的高度非常小，导致瀑布流排版挤成一团。
// 这就是为什么你在第一步需要先找出图片链接，等待图片加载完，再来量“身高”的原因。
// 获取每一个 item 的高度 因为得到每一个item的高度才能判断下一列的第一个item的位置
// 图片加载完毕 可以算出卡片撑开后的真实高度 获取高度

// 需要图片预加载时：图片未知时
let itemHeights = []

// 监听图片加载完成
const waitImgComplate = () => {
  itemHeights = []
  // 拿到所有元素 每一个item
  let itemElements = [...document.getElementsByClassName('m-waterfull-item')]
  // console.log(itemElements)
  // 拿到所有元素的img标签
  const imgElements = getImgElements(itemElements)
  // console.log(imgElements)
  // 获取所有 img 标签的图片
  const allImgs = getAllImg(imgElements)
  // console.log(allImgs)
  onComplateImgs(allImgs).then(() => {
    // 只有所有的图片都加载完毕了，浏览器才会执行这里的代码。
    // 浏览器已经把所有图片渲染出来了，每个卡片的高度已经被图片真真正正地撑开了
    // 图片加载完成，获取高度
    itemElements.forEach((el) => {
      // 这时候去取 el.offsetHeight，拿到的就是【包含图片的真实高度】
      itemHeights.push(el.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
  })
}

// 不需要图片预加载
// 如果不需要特意等待图片预加载，就直接、立刻去获取卡片高度并排版
const useItemHeight = () => {
  itemHeights = []
  // 获取dom
  // 拿到所有元素 每一个item
  let itemElements = [...document.getElementsByClassName('m-waterfull-item')]
  //获取dom的高度
  // 计算 item 高度
  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeigth)
  })
  // 渲染位置
  useItemLocation()
}

// 渲染位置
const useItemLocation = () => {
  // console.log(itemHeights)
  // 遍历数据源
  props.data.forEach((item, index) => {
    // 避免重复计算
    if (item._style) {
      return
    }
    // 生成 style 属性
    item._style = {}
    // left
    item._style.left = getItemleft()
    // top
    item._style.top = getItemtop()
    // 指定的列高度的自增
    increasingHeight(index)
  })
  // 指定容器的高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}

// 在组件销毁的时候 清除所以对 _style
onUnmounted(() => {
  data.props.forEach((item) => {
    delete item._style
  })
})

// 返回下一个item 的 left
const getItemleft = () => {
  // 拿到最小宽度的列
  const column = getMinHeightColumn(columnHeightObj.value)
  return (
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  )
}

// 返回下一个item 的 top
const getItemtop = () => {
  return getMinHeight(columnHeightObj.value)
}

// 指定列高度自增
const increasingHeight = (index) => {
  // 最小高度所在的列
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  // 使该列自增
  columnHeightObj.value[minHeightColumn] +=
    itemHeights[index] + props.rowSpacing
}
// 触发计算
watch(
  () => props.data,
  (newVal) => {
    nextTick(() => {
      // 第一次获取数据时，构建高度记录容器
      const resetColumnHeight = newVal.every((item) => !item._style)
      if (resetColumnHeight) {
        // 构建高度记录容器
        useColumnHeightObj()
      }
      if (props.picturePreReading) {
        waitImgComplate()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)
</script>
<style scoped lang="less"></style>
