import { PrismaPromise } from "@prisma/client";
import prismaGenerated from "./index";
//Add model names to the list below to enable them to be used in the code below
type ModelType = "user";
class PrismaServices {
  private readonly prisma;
  constructor(modelName: ModelType) {
    const prismaClient = prismaGenerated.getPrismaClient();
    this.prisma = prismaClient[modelName];
  }
  //TODO:RESOLVE ANY
  public async getByField(field: string, value: string, select: unknown = {}) {
    return this.prisma.findUnique({ where: { [field]: value }, select });
  }
  public async getAll(select?: unknown) {
    return this.prisma.findMany({ select });
  }
  public async create(data: any) {
    return this.prisma.create({ data });
  }
  public async update(id: number, data: unknown) {
    return this.prisma.update({ where: { id }, data });
  }
  public async updateBy(field: string, value: string, data: unknown) {
    return this.prisma.update({ where: { [field]: value }, data });
  }
  public async deleteById(id: number) {
    return this.prisma.delete({ where: { id } });
  }
  public async deleteByField(field: string, value: string) {
    return this.prisma.delete({ where: { [field]: value } });
  }
  public async createMany(data:unknown[]) {
    return this.prisma.createMany({
      data,
    });
  }
  public deleteMany():PrismaPromise<unknown> {
    return this.prisma.deleteMany()
  }  
}
export default PrismaServices;
