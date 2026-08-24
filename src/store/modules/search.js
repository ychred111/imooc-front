export default {
  namespaced: true,
  state: () => ({
    historys: []
  }),
  mutations: {
    //   新增历史
    addHistory(state, newHistory) {
      //   新增的历史记录位于头部
      // 不可出现重复的记录
      //   先判断是不是重复的历史
      const isFindIndex = state.historys.findIndex(
        (item) => item === newHistory
      )
      //   剔除旧数据 如果不等于 -1 就表示 存在 ，在历史数组里面按照知找到的下标，删掉它
      if (isFindIndex != -1) {
        state.historys.splice(isFindIndex, 1)
      }
      //   新增记录 要在头部新增
      state.historys.unshift(newHistory)
    },

    //   单个删除 delete
    deleteHistory(state, index) {
      state.historys.splice(index, 1)
    },

    //   全部删除
    deleteAllHistory(state) {
      state.historys = []
    }
  }
}
