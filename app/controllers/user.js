import UserService from '../services/user';
// import ApiError from '../core/error';

class UserControl {
  async register(ctx) {
    const { body } = ctx.request;
    await UserService.register(body);
    // ctx.body = data;
    // throw new ApiError('USER_NOT_EXIST');
  }
}

export default new UserControl();
