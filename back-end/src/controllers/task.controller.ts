import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../Dto/task.dto';


export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  async getAllTasks(req: Request, res: Response) {
    const tasks = await this.taskService.getAllTasks();
    res.json(tasks);
  }

  async getTask(req: Request, res: Response) {
    const task = await this.taskService.getTaskById(Number(req.params.id));
    task ? res.json(task) : res.status(404).send('Tarefa não encontrada');
  }

  async createTask(req: Request, res: Response) {
    try {
      const dto: CreateTaskDto = req.body
      const task = await this.taskService.createTask(dto);
      res.status(201).json(task);
    } catch (errors) {
      res.status(400).json({ errors });
    }
  }

  // Implementar update, delete de forma similar
}