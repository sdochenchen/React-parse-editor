exports.unique = function (option) {
  return async (context) => {
    const {service, data} = context

    const result = await service.find({query: {$limit: 1, email: data.email}})
    if (result.total > 0) {
      throw new Error('账号已存在！')
    }

    return context
  }
}
