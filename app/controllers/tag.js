import assert from 'assert';
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

  async deleteTag(ctx) {
    const { role } = auth.verifyHeaders(ctx);
    const { id } = ctx.params;

    const where = { id };
    const tag = await Tag.findOne({ where });

    assert(tag, '没有此标签');
    assert(role !== 'general', '只有管理员才能删除标签');

    await tag.destroy();
    ctx.body = '';
  },
};
