const fieldRequired = (fieldList) => async (ctx, next) => {
  let message
  const parameters = ctx.request.body

  if (fieldList.includes('username') && !parameters.username) {
    message = '用户名不能为空'
  } else if (fieldList.includes('password') && !parameters.password) {
    message = '密码不能为空'
  } else if (fieldList.includes('title') && !parameters.title) {
    message = '标题不能为空'
  } else if (fieldList.includes('category') && !parameters.category) {
    message = '类别不能为空'
  } else if (fieldList.includes('tags') && !parameters.tags) {
    message = '标签不能为空'
  } else if (fieldList.includes('summary') && !parameters.summary) {
    message = '摘要不能为空'
  } else if (fieldList.includes('blogContent') && !parameters.content) {
    message = '博客内容不能为空'
  } else if (fieldList.includes('blogId') && !parameters.blogId) {
    message = '博客id不能为空'
  } else if (fieldList.includes('commentContent') && !parameters.content) {
    message = '评论内容不能为空'
  }

  if (message) {
    ctx.failToJson(422, message)
    return
  }

  await next()
}

export default fieldRequired
