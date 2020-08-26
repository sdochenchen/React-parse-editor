import React from 'react'
import history from '../history'

export default function(props) {
  function handleClick(e) {
    e.preventDefault()

    history.push(props.to)
  }

  return (
    <a onClick={handleClick}>{props.children}</a>
  )
}
