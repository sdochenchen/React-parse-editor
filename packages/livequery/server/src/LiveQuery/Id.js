class Id {
  constructor(className, objectId) {
    this.className = className
    this.objectId = objectId
  }

  // static fromString(str) {
  //   let split = str.split(':')
  //   if (split.length !== 2) {
  //     throw new TypeError('Cannot create Id object from this string')
  //   }
  //   return new Id(split[0], split[1])
  // }

  toString() {
    return this.className + ':' + this.objectId
  }
}

module.exports = Id
