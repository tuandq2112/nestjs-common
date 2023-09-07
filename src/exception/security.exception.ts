import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class SecurityException extends BaseException {
  public static unauthorized = (): SecurityException => {
    throw new SecurityException(HttpStatus.UNAUTHORIZED, 'Unauthorized', null);
  };
}
