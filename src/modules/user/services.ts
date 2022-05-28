import { Prisma } from "@prisma/client";
import { comparePassword, hashPassword } from "@utils/authentication";
import logger from "@utils/logger";
import PrismaServices from "../../DB/prisma/services";
import CustomError from "../error/index";
import User from "./class";
import { UserI, UserModelI, UserSelect } from "./interfaces";
class UserServices  {
  private prisma = new PrismaServices('user')
  public async getUserByField(
    field: string,
    value: string,
    select?: UserSelect
  ): Promise<User> {
    const userData: UserModelI = await this.prisma.getByField(field, value, select) as UserModelI;
    return new User({
      id: userData.cuid,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      password: userData.password
    });
  }
  public async getUserById(
    id: number,
    select: UserSelect = { id: true, cuid: true }
  ): Promise<User> {
     return this.getUserByField("id", String(id), select);
  }

  public async getUserByEmail(
    email: string,
    select: UserSelect = { id: true, cuid: true, email: true }
  ): Promise<User> {
    return this.getUserByField("email", email, select);
  }
  public async getUserByCuid(
    id: string,
    select: UserSelect = { id: true, cuid: true }
  ): Promise<User> {
    return this.getUserByField("cuid", id, select);
  }
  public async createUser(
    userData: Prisma.UserCreateInput,
    select: Prisma.UserSelect
  ): Promise<User> {
    try {
      const password = await hashPassword(userData.password);
      const user: UserModelI = await this.prisma.create(
        { ...userData, password },
        select
      );
      if (!user) throw new CustomError("User not created");
      logger.info(`User ${user.cuid} created`);
      return new User({ ...user, id: user.cuid });
    } catch (e) {
      throw new CustomError(String(e));
    }
  }
  public async deleteUser(id: string): Promise<User> {
    try {
      const user: UserModelI = await this.prisma.deleteByField("cuid", id);
      if (!user) throw new CustomError("User not deleted");
      logger.info(`User ${user.cuid} deleted`);
      return new User({ id: user.cuid, email: user.email, name: user.name,role:user.role,password:user.password });
    } catch (e) {
      throw new CustomError(String(e));
    }
  }
  public async updateUser(userData: UserI): Promise<User> {
    try {
      const user: UserModelI = await this.prisma.updateBy(
        "cuid",
        userData.id,
        userData
      );
      logger.info(`User ${user.cuid} updated`);
      return new User({ id: user.cuid, email: user.email, name: user.name,role:user.role,password:user.password });
    } catch (e) {
      throw new CustomError(String(e));
    }
  }
  public validatePassword(
    password: string,
    passwordToCompare: string,
  ): boolean {
    return comparePassword(password, passwordToCompare);
  }
}
export default new UserServices();
