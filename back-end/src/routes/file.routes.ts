import { Router } from "express"
import { FileController } from "../controllers/file.controller"
import { FileService, upload } from "../services/file.service"

export class FileRoutes {
  public router: Router
  private fileController: FileController

  constructor() {
    this.router = Router()
    const fileService = new FileService
    this.fileController = new FileController(fileService)

    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/:fileId/files', this.fileController.getFiles.bind(this.fileController));
    this.router.get('/:taskId/files/:fileId/download', this.fileController.downloadFile.bind(this.fileController));
    this.router.post('/:id/upload', upload.single('file'), this.fileController.uploadFile.bind(this.fileController));
    this.router.delete('/:id/files/:fileId', this.fileController.deleteFile.bind(this.fileController));
  }
}