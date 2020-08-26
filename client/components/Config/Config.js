import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {withStyles} from '@material-ui/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CodeMirror from 'components/CodeMirror/CodeMirror'
import Resizable from 'components/Resizable/Resizable'
import {VertBar} from 'components/Resizable/DragBar'
import FabContainer from 'components/FabContainer/FabContainer'
import FormDialog from './FormDialog'
// import uuid from 'uuid/v4'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#e0e3eb',
  },
  list: {
    backgroundColor: '#fff',
  },
  listItemText: {
    minWidth: '12em',
  },
  fab: {
    margin: theme.spacing(1),
  },
})

function Config(props) {
  const [components, setComponents] = React.useState([])
  const [selected, setSelected] = React.useState({})
  const [open, setOpen] = React.useState(false)

  const {service} = props
  let current = selected

  const handleClose = () => {
    setOpen(false)
  }

  const handleOk = (title) => {
    if (title == null) return

    const c = {title}
    current = c

    service.create(c).then(docs => {
      setSelected(docs[0])
      setComponents(components.concat(docs))
    })
  }

  const handleListItemClick = (c) => {
    current = c
    setSelected(c)
  }

  const handleAdd = () => {
    setOpen(true)
  }

  const renderCodeMirror = () => {
    if (!selected) return null

    // const handleCmChange = (inst, co) => {
    //   if (current) {
    //     current.content = inst.getValue()
    //     // service.update(current)
    //     console.log(current.title, current.content)
    //   }
    // }

    return (
      <CodeMirror
        mode={{ name: 'jsx', json: true }}
        lineNumbers={true}
        styleActiveLine={true}
        matchBrackets={true}
        readOnly
        // cursorBlinkRate={c.content ? -1 : 530}
        value={current.content}
        // onChange={handleCmChange}
      />
    )
  }

  const getComponentList = () => {
    const { classes } = props

    return components.map(c => {
      return (
        <ListItem
          selected={current === c}
          button
          key={c.id}
          onClick={() => handleListItemClick(c)}
        >
          <ListItemText classes={{ root: classes.listItemText }}>
            {c.title}
          </ListItemText>
        </ListItem>
      )
    })
  }

  React.useEffect(() => {
    let aborted = false
    service.find({
      $limit: 5,
      $skip: 0,
      $sort: { createdAt: -1 },
    }).then(res => {
      if (aborted) return

      console.log(res)

      setComponents(components.concat(res.data))
    })

    return () => {
      aborted = true
    }
  }, [])

  const { classes } = props

  return (
    <React.Fragment>
      <VertBar style={{ width: '3px' }}/>
      <Resizable className={classes.root}>
        <List
          classes={{ root: classes.list }}
          component="nav"
        >
          {getComponentList()}
        </List>
        <VertBar/>
        {renderCodeMirror()}
      </Resizable>
      <FabContainer>
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleAdd}>
          <AddIcon/>
        </Fab>
        <Fab color="secondary" aria-label="edit" className={classes.fab}>
          {/*<Icon>edit_icon</Icon>*/}
          <EditIcon/>
        </Fab>
        <Fab disabled aria-label="delete" className={classes.fab}>
          <DeleteIcon/>
        </Fab>
      </FabContainer>
      <FormDialog open={open} close={handleClose} ok={handleOk}/>
    </React.Fragment>
  )
}

export default withStyles(styles)(Config)
