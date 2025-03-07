import { PrismaClient } from '@prisma/client';

// Singleton para garantir apenas uma instância do PrismaClient
class PrismaInstance {
  private static instance: PrismaClient;

  private constructor() { }

  public static getInstance(): PrismaClient {
    if (!PrismaInstance.instance) {
      PrismaInstance.instance = new PrismaClient();
    }
    return PrismaInstance.instance;
  }
}

// Exportar uma instância do PrismaClient
const prisma = PrismaInstance.getInstance();

export default prisma;