import bcrypt from 'bcrypt';
import assert from 'assert';
import auth from '../utils/auth';
import { User } from '../models';

export default {
  async register(ctx) {
    const { username, password } = ctx.request.body;

    assert(username, '用户名不能为空');
    assert(password, '密码不能为空');

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

    assert(newUser[1], '用户已存在');

    const token = auth.sign(newUser[0]);
    ctx.body = token;
  },

  async login(ctx) {
    const { username, password } = ctx.request.body;

    assert(username, '用户名不能为空');
    assert(password, '密码不能为空');

    const user = await User.findOne({
      where: {
        username,
      },
    });

    assert(user, '用户不存在');

    const isUserValid = bcrypt.compare(password, user.password);

    assert(isUserValid, '用户密码错误');

    const token = auth.sign(user);
    ctx.body = token;
  },

  async verify(ctx) {
    ctx.body = '认证成功';
  },

  async registerAdmin(ctx) {
    const { username, password } = ctx.request.body;

    assert(username, '用户名不能为空');
    assert(password, '密码不能为空');

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

    assert(newUser[1], '用户已存在');

    const token = auth.sign(newUser[0]);
    ctx.body = token;
  },

  async registerRoot(ctx) {
    const { username, password } = ctx.request.body;

    assert(username, '用户名不能为空');
    assert(password, '密码不能为空');

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

    assert(newUser[1], '用户已存在');

    const token = auth.sign(newUser[0]);
    ctx.body = token;
  },
};
