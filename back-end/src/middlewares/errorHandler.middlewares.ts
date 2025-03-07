import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ValidationError } from 'class-validator';
import { Prisma } from '@prisma/client';

interface IErrorResponse {
  statusCode: number;
  message: string;
  errors?: unknown[];
}

export const errorHandler: ErrorRequestHandler = (
  err: Error | ValidationError[] | Prisma.PrismaClientKnownRequestError | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  const response: IErrorResponse = {
    statusCode,
    message: 'Erro interno no servidor',
  };

  // 1. Tratar erros de validação do class-validator
  if (Array.isArray(err) && err[0] instanceof ValidationError) {
    statusCode = 400;
    response.statusCode = statusCode;
    response.message = 'Erro de validação';
    response.errors = err.map((e: ValidationError) => ({
      property: e.property,
      constraints: e.constraints,
    }));
  }

  // 2. Tratar erros customizados AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    response.statusCode = statusCode;
    response.message = err.message;
  }

  // 3. Tratar erros do Prisma
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    response.statusCode = statusCode;
    response.message = 'Erro no banco de dados';

    switch (err.code) {
      case 'P2025':
        response.message = 'Registro não encontrado';
        statusCode = 404;
        break;
      case 'P2002':
        response.message = 'Conflito de dados únicos';
        statusCode = 409;
        break;
    }
  }

  else if (err instanceof Error) {
    response.message = err.message;
  }

  res.status(statusCode).json(response);
};

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400
  ) {
    super(message);
  }
}