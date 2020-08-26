import {history, Page} from '@doce/core'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import config from './config'

import 'client/pages'
import Root from "./components/Root"

function isInLoginPath(pathname = window.location.pathname) {
  const paths = [
    '/',
    config.routePath.login,
    config.routePath.forgot,
    config.routePath.register
  ]
  return paths.includes(pathname)
}

Page.reAuthenticate().then(() => {
  if (isInLoginPath()) {
    history.replace(config.routePath.app)
  }
}).catch(e => {
  if (isInLoginPath()) {
    history.push(config.routePath.app)
  }
  history.push('/login')
}).finally(() => {
  window.__hide_landing()

  ReactDOM.render(
    <Root config={config} history={history}>
      {Page.render(config)}
    </Root>,
    document.getElementById('root'),
  )
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
