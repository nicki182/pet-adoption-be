import { PrismaClient } from "@prisma/client";
import { UserI } from '../modules/user/interfaces';
//Add model names to the list below to enable them to be used in the code below
type ModelType = "user";
//Add classes to the list below to enable them to be used in the code below
//type T = User;
//TODO: Make this a generic type working with any model
class PrismaServices /*implements GenericCrudServicesI<T>*/ {
  private readonly prisma;
  constructor(modelName: ModelType) {
    const prismaClient = new PrismaClient();
    this.prisma = prismaClient[modelName];
  }
  //TODO:RESOLVE ANY
  public getByField(field: string, value: string, select?: any) {
    return this.prisma.findUnique({ where: { [field]: value }, select });
  }
  public getAll(select?: object) {
    this.prisma.findMany({ select });
  }
  public create(data: UserI) {
    this.prisma.create({ data });
  }
  public update(id: number, data: UserI) {
    this.prisma.update({ where: { id }, data });
  }
  public delete(id: number) {
    this.prisma.delete({ where: { id } });
  }
}
export default PrismaServices;
