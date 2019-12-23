import auth from '../utils/auth';
import { User, Comment } from '../models';
import { ApiError, checkUndef } from '../core/error';

export default {
  async getComment(ctx) {
    const { id: blogId } = ctx.params;

    const comments = await Comment.findAll({
      where: {
        blog_id: blogId,
      },
      include: [{
        model: User,
        attributes: ['id', 'username'],
      }],
    });

    ctx.body = comments;
  },
  async createComment(ctx) {
    const { id: userId } = auth.verifyHeaders(ctx);
    const { blogId, content } = ctx.request.body;

    checkUndef({ blogId, content });

    const comment = await Comment.create({
      content,
      userId,
      blogId,
    });

    ctx.body = comment;
  },
  async deleteComment(ctx) {
    auth.verifyAdmin(ctx);
    const { id } = ctx.params;

    const where = { id };
    const comment = await Comment.findOne({ where });

    if (!comment) throw new ApiError('没有此评论！');

    await comment.destroy();
    ctx.body = '';
  },
};
