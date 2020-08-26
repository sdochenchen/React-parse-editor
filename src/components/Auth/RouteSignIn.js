import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Link } from '@doce/core'
import history from '@doce/core/history'

import SignIn from './SignIn'
import config from '../../config'


export default function (props) {
  function handleSubmit() {
    history.back()
  }

  return (
    <SignIn onSubmit={handleSubmit}>
      <Grid item xs>
        <Link to={config.routePath.forgot}>
          Forgot password?
        </Link>
      </Grid>
      <Grid item>
        <Link to={config.routePath.register}>
          Don't have an account? Sign Up
        </Link>
      </Grid>
    </SignIn>
  )
}
