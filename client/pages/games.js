import { Page } from '@doce/core'
import Game from 'components/Game/Game'

const PageConfig = {
  path: '/app/games',
  component: Game,
  props: {},
  i18n: {},
}

Page.newInstance(PageConfig)
