import bcrypt from 'bcrypt';
import auth from '../utils/auth';
import { User } from '../models';
import { ApiError, checkUndef } from '../core/error';

export default {
  async register(ctx) {
    const { username, password } = ctx.request.body;

    checkUndef({ username, password });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.findOrCreate({
      where: {
        username,
      },
      defaults: {
        username,
        password: hashedPassword,
      },
    });

    if (!newUser[1]) throw new ApiError('用户已存在');

    const token = auth.sign(newUser);
    ctx.body = token;
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

    const token = auth.sign(user);
    ctx.body = token;
  },

  async verify(ctx) {
    auth.verifyHeaders(ctx);
    ctx.body = '认证成功';
  },

  async registerAdmin(ctx) {
    const { username, password } = ctx.request.body;

    checkUndef({ username, password });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.findOrCreate({
      where: {
        username,
      },
      defaults: {
        username,
        password: hashedPassword,
        role: 'admin',
      },
    });

    if (!newUser[1]) throw new ApiError('用户已存在');

    const token = auth.sign(newUser);
    ctx.body = token;
  },

  async registerRoot(ctx) {
    const { username, password } = ctx.request.body;

    checkUndef({ username, password });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.findOrCreate({
      where: {
        username,
      },
      defaults: {
        username,
        password: hashedPassword,
        role: 'root',
      },
    });

    if (!newUser[1]) throw new ApiError('用户已存在');

    const token = auth.sign(newUser);
    ctx.body = token;
  },
};
