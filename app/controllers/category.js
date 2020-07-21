const { Category } = require('../models')

class CategoryController {
  async getCategory(ctx) {
    const categories = await Category.findAll({
      order: [['id']],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    ctx.toJson({ categories })
  }

  async deleteCategory(ctx) {
    const { id } = ctx.params

    const where = { id }
    const category = await Category.findOne({ where })

    if (!category) ctx.throw(400, '没有此类别')

    await category.destroy()
    ctx.toJson()
  }
}

module.exports = new CategoryController()
