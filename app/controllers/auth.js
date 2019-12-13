import bcrypt from 'bcrypt';
import auth from '../utils/auth';
import User from '../models/user';
import { ApiError, checkUndef } from '../core/error';

export default {
  async register(ctx) {
    const { username, password } = ctx.request.body;

    checkUndef({ username, password });

    const hasUser = await User.findOne({
      where: {
        username,
      }
    });

    if (hasUser) throw new ApiError('用户已存在');

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      password: hashedPassword,
    });
  },

  async login(ctx) {
    const { username, password } = ctx.request.body;

    checkUndef({ username, password });

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) throw (new ApiError('用户不存在'));

    const isUserValid = bcrypt.compare(password, user.password);

    if (!isUserValid) throw (new ApiError('用户密码错误'));

    const token = auth.sign({ username, password });
    ctx.body = token;
  },

  async verify(ctx) {
    try {
      const { authorization } = ctx.headers;
      const token = authorization && authorization.split(' ')[1];
      const userInfo = auth.verify(token);
      const isUserValid = userInfo && bcrypt.compare(password, userInfo.password);

      if (!isUserValid) throw (new ApiError('认证失败'));

      ctx.body = '认证成功';
    } catch (error) {
      throw (new ApiError('认证失败'));
    }
  },
};
