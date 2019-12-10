import UserService from '../services/user';
// import ApiError from '../core/error';
// import errorNames from '../utils/error_names';

class UserControl {
  async register(ctx) {
    const { body } = ctx.request;
    await UserService.register(body);
    // ctx.body = data;
    // throw new ApiError(errorNames.USER_NOT_EXIST);
  }
}

export default new UserControl();
