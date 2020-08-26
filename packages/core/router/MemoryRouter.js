import React from 'react'
import { createMemoryHistory as createHistory } from 'history'

import Router from './Router'

/**
 * The public API for a <Router> that stores location in memory.
 */
class MemoryRouter extends React.Component {
  history = createHistory(this.props)

  render() {
    return <Router history={this.history} children={this.props.children}/>
  }
}

export default MemoryRouter
