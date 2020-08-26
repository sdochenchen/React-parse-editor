import React from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'

import './CodeMirror.css'

const style = {
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  maxHeight: '100%',
  overflow: 'auto',
}

const defaultOption = {
  autofocus: true,
  cursorHeight: .85,
}

const noop = () => {
}

export default class _ extends React.Component {
  ref = React.createRef()
  doc = null

  handler = {}

  bindEvent(evt) {
    this.doc.on(evt, (...args) => {
      const name = 'on' + evt[0].toUpperCase() + evt.substring(1)
      if (typeof this.handler[name] === 'function') this.handler[name](...args)
    })
  }

  registerEvents() {
    this.bindEvent('change')
  }

  unregisterEvents() {
    this.doc.off('change')
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    this.doc.setValue(nextProps.value || '')
    for (let k in nextProps) {
      if (k !== 'value' && !k.startsWith('on')) {
        this.doc.setOption(k, nextProps[k])
      }
    }

    Object.assign(this.handler, nextProps)

    return false
  }

  componentDidMount() {
    const container = this.ref.current
    this.doc = CodeMirror(
      container,
      Object.assign(
        {},
        defaultOption,
        this.props,
        {value: this.props.value || ''}
      ),
    )

    this.registerEvents()
  }

  componentWillUnmount() {
    this.unregisterEvents()
  }

  render() {
    return (<div style={style} ref={this.ref}/>)
  }
}
