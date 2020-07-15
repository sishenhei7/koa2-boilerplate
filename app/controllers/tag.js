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

    ctx.okToJson({ tags });
  },

  async deleteTag(ctx) {
    const { id } = ctx.params;

    const where = { id };
    const tag = await Tag.findOne({ where });

    assert(tag, '没有此标签');

    await tag.destroy();
    ctx.okToJson();
  },
};
