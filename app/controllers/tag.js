import { Tag } from '../models';
import { ApiError } from '../core/error';

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

  async deleteTag(ctx) {
    const { role } = auth.verifyHeaders(ctx);
    const { id } = ctx.params;

    const where = { id };
    const tag = await Tag.findOne({ where });

    if (!tag) throw new ApiError('没有此标签！');
    if (role === 'general') {
      throw new ApiError('只有管理员才能删除标签！');
    }

    await tag.destroy();
    ctx.body = '';
  },
};
