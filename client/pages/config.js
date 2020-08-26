import {Page} from '@doce/core'
import {connect} from '@doce/livequery/client'
import Config from 'components/Config/Config'

const component = connect({
  service: 'component',
  optimization: {},
})(Config)

const PageConfig = {
  path: '/app/config',
  component,
  props: {},
  i18n: {},
}

Page.newInstance(PageConfig)
