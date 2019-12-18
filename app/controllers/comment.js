import { Comment } from '../models';
import { ApiError, checkUndef } from '../core/error';

export default {
  async createComment(ctx) {
    const { id: userId } = auth.verifyHeaders(ctx);
    const { id: blogId } = ctx.params;
    const { content } = ctx.request.body;

    checkUndef({ content });

    const tags = await Comment.create({
      content,
      user_id: userId,
      blog_id: blogId,
    });

    ctx.body = tags;
  },
  async deleteComment(ctx) {

  },
};
