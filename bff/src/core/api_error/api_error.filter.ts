import {
    Logger,
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    Injectable,
    Scope,
    HttpException,
  } from '@nestjs/common';
  
  import { Response } from 'express';
  import { GenericException } from '../api_error/exceptions';
  
  @Injectable({ scope: Scope.REQUEST })
  @Catch()
  export class ApiErrorFilter<T> implements ExceptionFilter {
    constructor( ) { }
  
    catch(exception: T | any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const req: Request = ctx.getRequest();
      const res: Response = ctx.getResponse();
  
      let genericException: GenericException;
      if (exception instanceof HttpException) {
        genericException = new GenericException('HTTP error', exception.message);
        genericException.setStatus(exception.getStatus());
      } else if (exception instanceof GenericException) {
        genericException = exception;
      } else {
        genericException = new GenericException(exception.name, exception.message);
      }
  
      Logger.error(
        `${req.method}: ${req.url}`,
        JSON.stringify(genericException),
        'ERROR',
      );
      const sts = genericException.getStatus();
      genericException.setStatus(undefined);
  
      res.status(sts).json(genericException);
    }
  }
  