import { PrismaClient } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from '../Dto/task.dto';

const prisma = new PrismaClient();

export class TaskService {
  async getAllTasks() {
    return await prisma.task.findMany({ include: { files: true } });
  }

  async getTaskById(id: number) {
    return await prisma.task.findUnique({ where: { id }, include: { files: true } });
  }

  async createTask(dto: CreateTaskDto) {
    return await prisma.task.create({ data: dto });
  }

  async updateTask(id: number, dto: UpdateTaskDto) {
    return await prisma.task.update({ where: { id }, data: dto });
  }

  async deleteTask(id: number) {
    return await prisma.task.delete({ where: { id } });
  }
}