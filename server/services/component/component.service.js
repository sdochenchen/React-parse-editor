// Initializes the `Component` service on path `/component`
const {Component} = require('./component.class')
const hooks = require('./component.hooks')

module.exports = function (app) {

  const paginate = app.get('paginate')

  const options = {
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/component', new Component(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('component')

  service.hooks(hooks)
}
