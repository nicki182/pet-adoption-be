import PrismaServices from "../../DB/prisma/services";
import { UserI, UserSelect, UserModelI, UserCreate } from "./interfaces";
import User from "./class";
import { comparePassword, hashPassword } from "@utils/authentication";
import  logger  from '@utils/logger';
import CustomError from '../error/index';
import { Prisma } from "@prisma/client";
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
  public async getUserById(id: number, select: UserSelect = {id:true, cuid:true}): Promise<User> {
    return this.getByField("id", String(id), select);
  }
  public async getUserByEmail(
    email: string,
    select: UserSelect = {id:true, cuid:true, email:true}
  ): Promise<User> {
    return this.getByField("email", email, select);
  }
  public async getUserByCuid(id: string, select: UserSelect = {id:true, cuid:true}): Promise<User> {
    return this.getByField("cuid", id, select);
  }
  public async createUser(userData:Prisma.UserCreateInput,select:Prisma.UserSelect): Promise<User> {
    try{
    const password = await hashPassword(userData.password);
    const user: UserModelI = await this.create({...userData, password}, select );
    if(!user) throw new CustomError("User not created");
    logger.info(`User ${user.cuid} created`);
    return new User({ id: user.cuid, email: user.email, name: user.name });
    }catch(e){
      throw new CustomError(String(e));
    }
  }
  public async updateUser(userData: UserI): Promise<User> {
    try{
    const user: UserModelI = await this.updateBy("cuid", userData.id, userData);
    logger.info(`User ${user.cuid} updated`);
    return new User({ id: user.cuid, email: user.email, name: user.name });
    }catch(e){
      throw new CustomError(String(e));
    }
  }
  public validatePassword(
    password: string,
    passwordToCompare: string
  ): boolean {
    return comparePassword(password, passwordToCompare);
  }
}
export default new UserServices();
