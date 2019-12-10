import auth from '../utils/auth';

class AuthControl {
  async login(ctx) {
    const token = auth.sign(ctx, ctx.request.body);
    ctx.body = token;
  }
}

export default new AuthControl();
