import assert from 'assert';
import auth from '../utils/auth';
import { User, Comment } from '../models';

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
    const { id: userId } = ctx.request.user;
    const { blogId, content } = ctx.request.body;

    assert(blogId, '博客id不能为空');
    assert(content, '评论内容不能为空');

    const comment = await Comment.create({
      content,
      userId,
      blogId,
    });

    ctx.body = comment;
  },
  async deleteComment(ctx) {
    const { id } = ctx.params;

    const where = { id };
    const comment = await Comment.findOne({ where });

    assert(comment, '没有此评论');

    await comment.destroy();
    ctx.body = '';
  },
};
