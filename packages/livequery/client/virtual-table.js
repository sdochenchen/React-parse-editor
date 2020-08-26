export default class VirtualTable {
  constructor(pageSize = 10) {
    this.pageSize = pageSize

    this.records = new Map()
  }

  get size() {
    return this.records.size
  }

  async get(id) {
    let r = this.records.get(id)
    if (r != null) return r

  }

  query(q = {}) {

  }

  insert() {

  }

  remove() {

  }

  update() {

  }
}
