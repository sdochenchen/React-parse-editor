import React from 'react'
// import { createLocation, locationsAreEqual } from "./utils";
import invariant from 'tiny-invariant'

import Lifecycle from './Lifecycle'
import RouterContext from './RouterContext'

// import generatePath from "./generatePath";

/**
 * The public API for navigating programmatically with a component.
 */
function Redirect({ to }) {
  return (
    <RouterContext.Consumer>
      {context => {
        invariant(context, 'You should not use <Redirect> outside a <Router>')

        const { history } = context

        return (
          <Lifecycle
            onMount={() => {
              history.replace(to)
            }}
            onUpdate={(self, prevProps) => {
              if (prevProps.to !== to) {
                history.replace(location)
              }
            }}
            to={to}
          />
        )
      }}
    </RouterContext.Consumer>
  )
}

export default Redirect
