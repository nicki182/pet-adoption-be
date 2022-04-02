import PrismaServices from '../../prismaDB/index';
import { UserI } from './interfaces';
class UserServices extends PrismaServices {
  constructor() {
    super('user');
  }
  public async singUp(userData: any) {
    const user = await this.getByField('email', userData.email);
    if (user) {
      return {
        status: 'error',
        message: 'User already exists',
      };
    }
    const newUser = await this.create(userData);
    return {
      status: 'success',
      message: 'User created successfully',
      user: newUser,
    };
  }
    public async singIn(userData: any) {
    const user = await this.getByField('email', userData.email);
    if (!user) {
      return {
        status: 'error',
        message: 'User does not exist',
      };
    }
    if (user.password !== userData.password) {
      return {
        status: 'error',
        message: 'Wrong password',
      };
    }
    return {
      status: 'success',
      message: 'User logged in successfully',
      user: user,
    };
  }
}
export default new UserServices();
