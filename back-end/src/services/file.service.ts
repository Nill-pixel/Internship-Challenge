import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido'));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

export class FileService {
  async uploadFile(taskId: number, file: Express.Multer.File) {
    return await prisma.file.create({
      data: {
        taskId,
        filename: file.originalname,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      },
    });
  }
  async getFile(fileId: number) {
    return await prisma.file.findMany({
      where: {
        taskId: fileId,
      }
    });
  }

  async deleteFile(fileId: number) {
    return await prisma.file.delete({ where: { id: fileId } });
  }
}