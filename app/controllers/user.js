import { User } from '../models';

export default {
  async getAllUsers(ctx) {
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
};

