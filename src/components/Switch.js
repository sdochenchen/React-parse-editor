import React from 'react'

export default function Switch(props) {
  const [selected, setSelected] = React.useState(props.value)
  const children = {}

  React.Children.forEach(props.children, element => {
    React.Children.only(element.props.children)
    children[element.props.name] = React.cloneElement(
      element.props.children,
      {
        setSelected: (v) => {
          setSelected(v)
          if (props.onChange) props.onChange(v)
        },
        done: () => {
          if (props.onDone) props.onDone()
        }
      }
    )
  })

  return (
    <div>{children[selected]}</div>
  )
}
