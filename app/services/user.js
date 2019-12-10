import bcrypt from 'bcrypt';
import User from '../models/user';
import ApiError from '../core/error';

class UserService {
  async register({ username, password }) {
    if (!username || !password) {
      throw new ApiError(INVALID_ARGUMENT);
    }

    const hasUser = await User.findOne({
      where: {
        username,
      }
    });

    if (hasUser) {
      throw new ApiError(USER_IS_EXISTED);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        password: hashedPassword,
      });
      return user;
    }
  }
}

export default new UserService();
