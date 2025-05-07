import { INestApplication } from '@nestjs/common';
import redoc from 'redoc-express';

export function setupRedoc(app: INestApplication<any>) {
  const redocOptions = {
    title: 'Pettech Stock API',
    version: '1.0',
    specUrl: '/api-json',
  };

  app.use('/docs', redoc(redocOptions));
}
