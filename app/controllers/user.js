import { User, Blog, Comment } from '../models';

export default {
  async getUser(ctx) {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
      order: [
        ['id'],
      ],
    });

    ctx.okToJson({ users });
  },

  async deleteUser(ctx) {
    const { id } = ctx.params;

    const where = { id };
    const user = await User.findOne({ where });

    if (!user) {
      ctx.failToJson(404, '没有此用户');
      return;
    }

    await Blog.destroy({ where: { userId: id } });
    await Comment.destroy({ where: { userId: id } });
    await user.destroy();
    ctx.okToJson();
  },
};
