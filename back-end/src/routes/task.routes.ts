import express, { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { TaskService } from '../services/task.service';

export class TaskRoutes {
  public router: Router
  private taskController: TaskController

  constructor() {
    this.router = Router()
    const taskService = new TaskService
    this.taskController = new TaskController(taskService)

    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', this.taskController.getAllTasks.bind(this.taskController));
    this.router.get('/:id', this.taskController.getTask.bind(this.taskController));
    this.router.post('/', this.taskController.createTask.bind(this.taskController));
    this.router.put('/:id', this.taskController.updateTask.bind(this.taskController));
    this.router.delete('/:id', this.taskController.deleteTask.bind(this.taskController));
  }
}