import { PrismaClient } from '@prisma/client';
//Add model names to the list below to enable them to be used in the code below
type ModelType = 'user';

class PrismaServices {
  private readonly prisma;
  constructor(modelName: ModelType) {
    const prismaClient = new PrismaClient();
    this.prisma = prismaClient[modelName];
  }
  public getByField(field: string, value: string,select?:any) {
    return this.prisma.findUnique({ where: { [field]: value },select });
  }
  public getAll(select?:any) {
    this.prisma.findMany({select});
  }
  public create(data: any) {
    this.prisma.create({ data });
  }
  public update(id: number, data: any) {
    this.prisma.update({ where: { id }, data });
  }
  public delete(id: number) {
    this.prisma.delete({ where: { id } });
  }
}
export default PrismaServices;
