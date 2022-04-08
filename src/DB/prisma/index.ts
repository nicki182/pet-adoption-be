import { PrismaClient } from '@prisma/client';
class PrismaClientGenerated{
    private readonly prisma;
    constructor() {
        this.prisma = new PrismaClient();
    }
    getPrismaClient(): PrismaClient {
      return  this.prisma
    }
}
export default new PrismaClientGenerated()