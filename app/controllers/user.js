import { User, Blog, Comment } from '../models';
import auth from '../utils/auth';
import { ApiError } from '../core/error';

export default {
  async getUser(ctx) {
    auth.verifyAdmin(ctx);

    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
      order: [
        ['id'],
      ],
    });

    ctx.body = users;
  },

  async deleteUser(ctx) {
    auth.verifyAdmin(ctx);
    const { id } = ctx.params;

    const where = { id };
    const user = await User.findOne({ where });

    if (!user) throw new ApiError('没有此用户！');

    await Blog.destroy({ where: { userId: id } });
    await Comment.destroy({ where: { userId: id } });
    await user.destroy();
    ctx.body = '';
  },
};
