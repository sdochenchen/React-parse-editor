import { Page } from '@doce/core'
import App from 'components/App/App'
import InboxIcon from '@material-ui/icons/Inbox'
import ListIcon from '@material-ui/icons/List'
import DraftsIcon from '@material-ui/icons/Drafts'

Page.newInstance({
  path: '/app',
  component: App,
  authorization: false,
  props: {
    icons: [
      { key: 'config', to: '/app/config', component: ListIcon },
      { key: 'users', to: '/app/users', component: InboxIcon },
      { key: 'games', to: '/app/games', component: DraftsIcon },
    ],
  },
})
