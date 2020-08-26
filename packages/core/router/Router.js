import React from 'react'

import RouterContext from './RouterContext'

/**
 * The public API for putting history on context.
 */
class Router extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      location: props.history.location,
    }

    // This is a bit of a hack. We have to start listening for location
    // changes here in the constructor in case there are any <Redirect>s
    // on the initial render. If there are, they will replace/push when
    // they mount and since cDM fires in children before parents, we may
    // get a new location before the <Router> is mounted.
    this.location = null

    this.unlisten = props.history.listen(location => {
      this.setState({ location })
    })
  }

  static computeRootMatch(pathname) {
    return { path: '/', url: '/', params: {}, isExact: pathname === '/' }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.location) {
      this.setState({ location: this.location })
      this.location = null
    }
  }

  componentDidMount() {
    if (this.location) {
      this.setState({ location: this.location })
    }
  }

  componentWillUnmount() {
    if (this.unlisten) this.unlisten()
  }

  render() {
    return (
      <RouterContext.Provider
        children={this.props.children || null}
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
        }}
      />
    )
  }
}

export default Router
