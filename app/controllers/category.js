import { Category } from '../models';
import auth from '../utils/auth';
import { ApiError } from '../core/error';

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

  async deleteCategory(ctx) {
    auth.verifyAdmin(ctx);
    const { id } = ctx.params;

    const where = { id };
    const category = await Category.findOne({ where });

    if (!category) throw new ApiError('没有此类别！');

    await category.destroy();
    ctx.body = '';
  },
};
