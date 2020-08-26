import React from 'react'

const style = {
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
}

const defaultSize = '7px'

class DragBar extends React.Component {
  onMouseDown = (evt) => {
    console.log('mouse down')
    if (this.props.onMouseDown) this.props.onMouseDown(evt)
  }

  onMouseUp = (evt) => {
    console.log('mouse up')
    if (this.props.onMouseUp) this.props.onMouseUp(evt)
  }

  render(s) {
    return (
      <div
        style={Object.assign({}, style, s, this.props.style)}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      />
    )
  }
}

export class VertBar extends DragBar {
  render() {
    return super.render({ width: defaultSize, cursor: 'ew-resize' })
  }
}

export class HorizBar extends DragBar {
  render() {
    return super.render({ height: defaultSize, cursor: 'ns-resize' })
  }
}
