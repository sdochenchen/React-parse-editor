import React from 'react'
import Register from './Register'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import config from '../../config'
import history from '@doce/core/history'

export default function (props) {
  function handleSubmit() {
    history.replace(config.routePath.login)
  }

  return (
    <Register onSubmit={handleSubmit}>
      <Grid item>
        <Link to={config.routePath.login}>
          Already have an account? Sign in
        </Link>
      </Grid>
    </Register>
  )
}
