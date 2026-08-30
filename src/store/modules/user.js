import { loginUser, getProfile } from '@/api/sys'
import SparkMD5 from 'spark-md5'
import { message } from '@/libs'

export default {
  //  标记独立作用域
  namespaced: true,
  state: () => ({
    //   登陆之后的 token
    token: '',
    // 用户信息
    userInfo: {}
  }),
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
    },
    setUserInfo(state, newInfo) {
      state.userInfo = newInfo
    }
  },
  actions: {
    // 登陆
    async login(context, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? SparkMD5.hash(password) : ''
      })
      context.commit('setToken', data.token)
    },
    // 获取用户信息
    async profile(context) {
      const data = await getProfile()
      // console.log(data)
      context.commit('setUserInfo', data)
      message(
        'success',
        `欢迎您 ${
          data.vipLevel
            ? '尊贵的 VIP' + data.vipLevel + ' 用户 ' + data.nickname
            : data.nickname
        } `,
        6000
      )
    },
    // 退出登陆
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      // 退出登录之后，重新刷新下页面，因为对于前台项目而言，用户是否登录（是否为 VIP）看到的数据可能不同
      location.reload()
    }
  }
}
