import { ZodSchema } from 'zod';

import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    try {
      const passedValue = this.schema.parse(value);
      return passedValue;
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}
