import assert from 'assert';
import { User, Blog, Comment } from '../models';
import auth from '../utils/auth';

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

    ctx.body = users;
  },

  async deleteUser(ctx) {
    const { id } = ctx.params;

    const where = { id };
    const user = await User.findOne({ where });

    assert(user, '没有此用户');

    await Blog.destroy({ where: { userId: id } });
    await Comment.destroy({ where: { userId: id } });
    await user.destroy();
    ctx.body = '';
  },
};
