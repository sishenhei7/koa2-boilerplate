import Sequelize from 'sequelize';
import Blog from '../models/blog';

const Op = Sequelize.Op;

export default {
  async getAllBlog(ctx) {
    const { search } = ctx.request.query;
    let data = null;

    if (search) {
      data = await Blog.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${search}%`,
              }
            },
            {
              author: {
                [Op.like]: `%${search}%`,
              }
            }
          ],
        },
        order: [
          ['id'],
        ],
      });
    } else {
      data = await Blog.findAll({
        order: [
          ['id'],
        ],
      });
    }

    return ctx.body = data;
  },
};
