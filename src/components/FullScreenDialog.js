import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function FullScreenDialog(props) {
  // function handleClose() {
  //   if (props.onClose) props.onClose()
  // }

  return (
    <Dialog fullScreen open={props.open} onClose={props.onClose} TransitionComponent={Transition}>
      {props.children}
    </Dialog>
  )
}
