import React from 'react'
import FullScreenDialog from '../FullScreenDialog'
import Switch from "../Switch"
import Case from '../Case'
import SignIn from "./SignIn"
import Forgot from './Forgot'
import Register from './Register'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function (props) {
  function handleChange(v) {
    console.log(v)
  }

  return (
    <FullScreenDialog open={props.open} onClose={props.onClose}>
      <Switch value={props.defaultValue} onChange={handleChange} onDone={props.onClose}>
        <Case name='login'><SignIn/></Case>
        <Case name='forgot'><Forgot/></Case>
        <Case name='register'><Register/></Case>
      </Switch>
    </FullScreenDialog>
  )
}
