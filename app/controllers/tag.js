import { Tag } from '../models'

class TagController {
  async getTag(ctx) {
    const tags = await Tag.findAll({
      order: [['id']],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    ctx.okToJson({ tags })
  }

  async deleteTag(ctx) {
    const { id } = ctx.params

    const where = { id }
    const tag = await Tag.findOne({ where })

    if (!tag) {
      ctx.failToJson(404, '没有此标签')
      return
    }

    await tag.destroy()
    ctx.okToJson()
  }
}

export default new TagController()
