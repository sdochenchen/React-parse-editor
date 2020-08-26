import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { loginWithEmailPassword } from '@doce/core'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

let email = '', password = null

function SignIn(props) {
  const classes = useStyles()
  const [checked, setChecked] = React.useState(true)

  const { enqueueSnackbar } = useSnackbar()

  const onEmail = (e) => {
    email = e.target.value
  }

  const onPassword = (e) => {
    password = e.target.value
  }

  const onRemember = (e) => {
    setChecked(e.target.checked)
  }

  const submit = (e) => {
    e.preventDefault()
    return loginWithEmailPassword({ email, password, remember: checked })
      .then((res) => {
        if (props.onSubmit) props.onSubmit()
      })
      .catch(e => {
        enqueueSnackbar(e.message)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={submit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onPassword}
          />
          <FormControlLabel
            control={<Checkbox checked={checked} color="primary" onChange={onRemember}/>}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            {props.children}
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright/>
      </Box>
    </Container>
  )
}

export default function(props) {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={1800} variant="error"
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <SignIn {...props}/>
    </SnackbarProvider>
  )
}
