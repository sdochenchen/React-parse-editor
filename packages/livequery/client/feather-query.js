import {getService} from "@doce/core"


export default class LiveQueryService {
  constructor(option) {
    this.option = option
    this.service = getService(this.option.service)
  }

  static async initialize() {

  }
}
