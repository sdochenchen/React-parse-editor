import React from 'react'
import { Link as RouterLink, Redirect, Switch } from '@doce/core'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/styles'

const styles = {
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#e0e3eb',
  },
  list: {
    width: 'auto',
    backgroundColor: '#fff',
  },
  listItemIcon: {
    minWidth: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,

  },
}

class App extends React.Component {
  state = {}

  renderIcons() {
    const { classes, icons } = this.props

    return icons.map(ic => (
      <RouterLink to={ic.to} key={ic.key}>
        <ListItem button>
          <ListItemIcon classes={{ root: classes.listItemIcon }}>
            <ic.component/>
          </ListItemIcon>
        </ListItem>
      </RouterLink>
    ))
  }

  render() {
    const { classes, icons, match, location } = this.props

    return (
      <div className={classes.root}>
        <List
          classes={{ root: classes.list }}
          component="nav"
        >
          {this.renderIcons()}
        </List>
        {location.pathname === match.url && <Redirect exact={true} from={match.url} to={icons[0].to}/>}
        <div className={classes.content}>
          <Switch>
            {this.props.children}
            {/*<NotFound/>*/}
          </Switch>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(App)
