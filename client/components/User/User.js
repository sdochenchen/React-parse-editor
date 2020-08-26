import React from 'react'


const style = {
  margin: 'auto',
  minWidth: '300px',
}

export default class User extends React.Component {
  render() {
    return (
      <div style={style}>
        {this.props.children}
      </div>
    )
  }
}
