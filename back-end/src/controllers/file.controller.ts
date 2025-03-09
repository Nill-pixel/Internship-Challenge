import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { FileService } from '../services/file.service';
import { FileDto } from '../Dto/file.dto';

export class FileController {
  constructor(private readonly fileService: FileService) { }

  async uploadFile(req: Request, res: Response) {
    try {
      const file = await this.fileService.uploadFile(
        Number(req.params.id),
        req.file!,
      );
      res.status(201).json(plainToInstance(FileDto, file));
    } catch (error) {
      res.status(500).json({ error: 'Falha no upload' });
    }
  }

  async getFile(req: Request, res: Response) {
    try {
      const taskId = Number(req.params.id);
      const fileId = Number(req.params.fileId);
      const file = await this.fileService.getFile(taskId, fileId)
      res.json(file)
    } catch (error) {
      res.status(400).json({ error })
    }

  }

  async deleteFile(req: Request, res: Response) {
    await this.fileService.deleteFile(Number(req.params.fileId));
    res.status(204).send();
  }
}