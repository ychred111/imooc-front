// val 表单的值
// 用户名的表单校验
export const validateUsername = (value) => {
  if (!value) {
    return '用户名要必填'
  }
  // 用户名长度验证
  if (value.length < 3 || value.length > 10) {
    return '用户名长度要在 3-10 位之间'
  }
  return true
}

// 密码的表单验证
export const validatePassword = (value) => {
  if (!value) {
    return '密码要必填'
  }
  // 密码长度验证
  if (value.length < 6 || value.length > 12) {
    return '密码长度要在 6-11 位之间'
  }
  return true
}

/**
 * 确认密码的表单校验
 */
export const validateConfirmPassword = (value, password) => {
  if (value !== password[0]) {
    return '两次密码输入必须一致'
  }
  return true
}
