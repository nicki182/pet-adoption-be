import PrismaServices from "../../DB/prisma/services";
import { UserI, UserSelect, UserModelI } from "./interfaces";
import User from "./class";
import { comparePassword } from "@utils/authentication";
class UserServices extends PrismaServices {
  constructor() {
    super("user");
  }
  public async getUserByField(
    field: string,
    value: string,
    select?: UserSelect
  ): Promise<User> {
    const userData: UserModelI = await this.getByField(field, value, select);
    return new User({
      id: userData.cuid,
      email: userData.email,
      name: userData.name,
    });
  }
  public async getUserById(id: number, select?: UserSelect): Promise<User> {
    return this.getByField("id", String(id), select);
  }
  public async getUserByEmail(
    email: string,
    select?: UserSelect
  ): Promise<User> {
    return this.getByField("email", email, select);
  }
  public async getUserByCuid(id: string, select?: UserSelect): Promise<User> {
    return this.getByField("cuid", id, select);
  }
  public async createUser(userData: UserI): Promise<User> {
    const user: UserModelI = await this.create(userData);
    return new User({ id: user.cuid, email: user.email, name: user.name });
  }
  public async updateUser(userData: UserI): Promise<User> {
    const user: UserModelI = await this.updateBy("cuid", userData.id, userData);
    return new User({ id: user.cuid, email: user.email, name: user.name });
  }
  public validatePassword(
    password: string,
    passwordToCompare: string
  ): boolean {
    return comparePassword(password, passwordToCompare);
  }
}
export default new UserServices();
