import PrismaServices from '../../prismaDB/index';

class UserServices extends PrismaServices {
  constructor() {
    super('user');
  }
}
export default new UserServices();
