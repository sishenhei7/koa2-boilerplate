const fieldRequired = (fieldList) => async (ctx, next) => {
  const field = fieldList.find((item) => !ctx.request.body[item])

  if (field) ctx.throw(422, `${field} is required`)

  await next()
}

export default fieldRequired
