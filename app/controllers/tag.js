import { Tag } from '../models'

class TagController {
  async getTag(ctx) {
    const tags = await Tag.findAll({
      order: [['id']],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    ctx.toJson({ tags })
  }

  async deleteTag(ctx) {
    const { id } = ctx.params

    const where = { id }
    const tag = await Tag.findOne({ where })

    if (!tag) ctx.throw(404, '没有此标签')

    await tag.destroy()
    ctx.toJson()
  }
}

export default new TagController()
