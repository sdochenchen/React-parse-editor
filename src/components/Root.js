import React from 'react'
import { Redirect, Route, Router, Switch as RouteSwitch } from '@doce/core/router'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme()

/**
 * @return {null}
 */
export default function Root(props) {
  const {config, history} = props

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <RouteSwitch>
          {props.children}
          <Route path={config.routePath.login} component={config.SignIn}/>
          <Route path={config.routePath.register} component={config.SignUp}/>
          <Redirect to={config.routePath.app}/>
          {/*<Route component={config.NotFound}/>*/}
        </RouteSwitch>
      </Router>
    </ThemeProvider>
  )
}
