import assert from 'assert';
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

    ctx.okToJson({ categories });
  },

  async deleteCategory(ctx) {
    const { id } = ctx.params;

    const where = { id };
    const category = await Category.findOne({ where });

    assert(category, '没有此类别');

    await category.destroy();
    ctx.okToJson();
  },
};
