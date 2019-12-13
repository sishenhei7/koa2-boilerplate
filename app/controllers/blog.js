import Sequelize from 'sequelize';
import Blog from '../models/blog';
import { checkUndef } from '../core/error';

const Op = Sequelize.Op;

export default {
  async getBlog(ctx) {
    const {
      search = '',
      limit = 10,
      offset = 0,
    } = ctx.request.query;

    const count = await Blog.count({
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
    });

    let data = [];
    if (count > 0) {
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
        limit: Number(limit),
        offset: Number(offset),
        order: [
          ['id'],
        ],
      });
    }

    return ctx.body = {
      count,
      data,
    };
  },

  async createBlog(ctx) {
    const {
      title,
      tags,
      summary,
      content,
      author,
    } = ctx.request.body;

    checkUndef({ title, tags, summary, content, author });

    const hasBlog = await Blog.findOne({
      where: {
        title,
      }
    });

    if (hasBlog) throw new ApiError('博客标题已存在');

    const blog = await Blog.create({
      title,
      tags,
      summary,
      content,
      author,
    });

    ctx.body = blog;
  }
};
