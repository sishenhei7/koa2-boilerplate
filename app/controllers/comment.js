import { User, Comment } from '../models'

class CommentController {
  async getComment(ctx) {
    const { id: blogId } = ctx.params

    const comments = await Comment.findAll({
      where: {
        blog_id: blogId,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    })

    ctx.okToJson({ comments })
  }

  async createComment(ctx) {
    const { id: userId } = ctx.request.user
    const { blogId, content } = ctx.request.body

    const comment = await Comment.create({
      content,
      userId,
      blogId,
    })

    ctx.okToJson({ comment })
  }

  async deleteComment(ctx) {
    const { id } = ctx.params
    const where = { id }
    const comment = await Comment.findOne({ where })

    if (!comment) {
      ctx.failToJson(404, '没有此评论')
      return
    }

    await comment.destroy()
    ctx.okToJson()
  }
}

export default new CommentController()
