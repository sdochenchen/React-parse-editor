import React from 'react'
import { storiesOf } from '@storybook/react'
import 'antd/dist/antd.css'

import { Button } from '@storybook/react/demo'

import Login from 'components/User/Login'
import { LoginStatus } from '../client/utils/const'

(async () => {
  storiesOf('Button', module)
    .add('with text', () => (
      <Button>Hello Button</Button>
    ))
    .add('with emoji', () => (
      <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
    ))

  storiesOf('Login', module)
    .add('login', () => {
      const { Router } = require('@doce/core')

      const routePath = {
        app: '/app',
        login: '/user/login',
        register: '/user/register',
        forget: '/user/forget',
      }
      const i18n = {
        register: '注册账户',
        login: '登录',
        forget: '忘记密码',
        remember: '自动登录',
        placeholder: {
          username: '用户名',
          password: '密码',
        },
      }

      return (
        <Router>
          <Login
            status={LoginStatus.NONE}
            routePath={routePath}
            i18n={i18n}
          />
        </Router>
      )
    })
})()
