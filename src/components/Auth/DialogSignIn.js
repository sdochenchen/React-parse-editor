import React from 'react'
import SignIn from './SignIn'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'

export default function (props) {
  function handleSubmit() {
    props.done()
  }

  return (
    <SignIn onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs>
          <Link onClick={() => props.setSelected('forget')}>
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link onClick={() => props.setSelected('register')}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </SignIn>
  )
}
