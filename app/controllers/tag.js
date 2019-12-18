import { Tag } from '../models';

export default {
  async getTag(ctx) {
    const tags = await Tag.findAll({
      order: [
        ['id'],
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    ctx.body = tags;
  },
};
