import React from 'react'

const style = {
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  fontSize: '20px',
  userSelect: 'none',
}

export default function Landing(props) {
  if (!props.landing) return props.children

  return (
    <div style={style}>
      LANDING ...
    </div>
  )
}
