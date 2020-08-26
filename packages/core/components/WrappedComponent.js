import React from 'react'
import {withTheme} from '@material-ui/styles'


class WrappedComponent extends React.Component {
  state = {}

  constructor(props) {
    super(props)
    this.C = props.__internal_page_component

    this.routeProps = props.routeProps
    this.state = props.state
    this.page = props.page
  }

  render() {
    return (
      <this.C
        {...this.routeProps}
        {...this.state}
        page={this.page}
        theme={this.props.theme}
        history={this.props.history}
        location={this.props.location}
        match={this.props.match}
      >
        {this.props.children}
      </this.C>
    )
  }
}

export default withTheme(WrappedComponent)
