const fieldRequired = (fieldList) => async (ctx, next) => {
  const field = fieldList.find(item => ctx.request.body[item]);

  if (field) {
    ctx.failToJson(422, `${field} is required`)
    return
  }

  await next()
}

export default fieldRequired
