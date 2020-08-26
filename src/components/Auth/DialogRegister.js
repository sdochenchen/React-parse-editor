import React from 'react'
import Register from './Register'
import Grid from "@material-ui/core/Grid"
import Link from '@material-ui/core/Link'

export default function (props) {
  function handleSubmit() {
    props.done()
  }

  return (
    <Register onSubmit={handleSubmit}>
      <Grid container justify="flex-end">
        <Grid item>
          <Link onClick={() => props.setSelected('login')}>
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Register>
  )
}
