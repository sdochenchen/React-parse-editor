import React from 'react'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  root: {
    position: 'fixed',
    right: '25px',
    bottom: '15px',
    zIndex: 999,
  },
})

class FabContainer extends React.Component {
  render() {
    const { classes, children } = this.props

    return (
      <div className={classes.root}>
        {children}
      </div>
    )
  }
}

export default withStyles(styles)(FabContainer)
