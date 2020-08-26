class History {
  constructor() {
    this.history = window.history
  }

  get length() {
    return this.history.length
  }

  get state() {
    return this.history.state
  }

  set scrollRestoration(v) {
    this.history.scrollRestoration = v === 'auto' ? v : 'manual'
  }

  pushState(state, title, url) {
    this.history.pushState(state, title, url)
  }

  replaceState(state, title, url) {
    this.history.replaceState(state, title, url)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  go(delta) {
    this.history.go(delta)
  }
}

class PageHistory extends History {
  get location() {
    return window.location
  }

  _callListener() {
    if (this.listener) this.listener(this.location)
  }

  push(url, state, title = '') {
    this.pushState(state, title, url)
    this._callListener()
  }

  replace(url, state, title = '') {
    this.replaceState(state, title, url)
    this._callListener()
  }

  listen(callback) {
    this.listener = callback
    let cb = (evt) => {
      if (callback) callback(this.location)
    }

    window.addEventListener('popstate', cb)

    return () => {
      this.listener = null
      window.removeEventListener('popstate', cb)
    }
  }
}

const history = new PageHistory()
export default history
