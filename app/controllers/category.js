import { Category } from '../models';

export default {
  async getCategory(ctx) {
    const categories = await Category.findAll({
      order: [
        ['id'],
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    ctx.body = categories;
  },
};
