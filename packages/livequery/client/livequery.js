import React from 'react'
import LiveQueryService from './feather-query'

const SORT = {
  ASC: 1,
  DES: -1
}

export function connect(option = {}) {
  if (option.service == null) throw new Error(`service is required`)

  const livequery = new LiveQueryService(option)
  const service = livequery.service

  return (C) => {
    return (props) => {
      return <C {...props} service={service}/>
    }
  }
}
