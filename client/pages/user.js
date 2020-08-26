import {Page} from '@doce/core'
import User from 'components/User/User'

const PageConfig = {
  path: '/user',
  component: User,
  authorization: false,
  props: {
    error: null,
    routePath: {
      app: '/app',
      // login: '/user/login',
      // register: '/user/register',
      // forget: '/user/forget',
    },
  },
  i18n: {
    register: '注册账户',
    login: '登录',
    forget: '忘记密码',
    remember: '自动登录',
    userTab: '账户密码登录',
    phoneTab: '手机号登录',
    placeholder: {
      username: '用户名',
      password: '密码',
      phone: '手机号',
      code: '验证码',
      codeButton: '获取验证码',
    },
  },
}

Page.newInstance(PageConfig)
