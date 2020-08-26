const {Service} = require('feathers-mongodb')

exports.Component = class Component extends Service {
  constructor(options, app) {
    super(options)

    app.get('mongoClient').then(db => {
      this.Model = db.collection('component')
    })
  }
}
