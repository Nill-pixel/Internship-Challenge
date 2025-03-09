import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { FileService } from '../services/file.service';
import { FileDto } from '../Dto/file.dto';
import path from 'path';
import fs from 'fs'

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

  async getFiles(req: Request, res: Response) {
    try {
      const fileId = Number(req.params.fileId);
      const file = await this.fileService.getFiles(fileId)
      res.json(file)
    } catch (error) {
      res.status(400).json({ error })
    }

  }
  async downloadFile(req: Request, res: Response) {
    try {
      const fileId = Number(req.params.fileId);
      const file = await this.fileService.getFile(fileId);

      if (!file) {
        res.status(404).json({ error: 'Arquivo não encontrado' });
        return;
      }

      const filePath = path.resolve(file.path);

      if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: 'Arquivo não encontrado no sistema' });
        return;
      }

      res.setHeader('Content-Type', file.mimetype);
      res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);

      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
      res.status(500).json({ error: 'Falha ao baixar arquivo' });
    }
  }

  async deleteFile(req: Request, res: Response) {
    await this.fileService.deleteFile(Number(req.params.fileId));
    res.status(204).send();
  }
}