import express from 'express';
import { PrismaClient } from '@prisma/client';
import { TaskRoutes } from './routes/task.routes';
import { errorHandler } from './middlewares/errorHandler.middlewares';
import { FileRoutes } from './routes/file.routes';


const app = express();
const taskRoutes = new TaskRoutes()
const fileRoutes = new FileRoutes()
const prisma = new PrismaClient();

app.use(express.json());
app.use('/tasks', taskRoutes.router);
app.use('/tasks', fileRoutes.router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});