import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

export default function FormDialog(props) {
  let val = null
  const handleChange = (event) => {
    val = event.target.value
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
        {/*<DialogTitle id="form-dialog-title">组件标题</DialogTitle>*/}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="组件标题"
            type="text"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            props.close()
            if (props.cancel) props.cancel()
          }} color="default">
            取消
          </Button>
          <Button onClick={() => {
            props.close()
            if (props.ok) props.ok(val)
          }} color="primary">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
