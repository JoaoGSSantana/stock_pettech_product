import { Request } from 'express';
import { Observable, tap } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { PrometheusService } from '../services/prometheus.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  constructor(private readonly prometheusService: PrometheusService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();

    const now = Date.now();

    return next.handle().pipe(tap(() => {
      const duration = Date.now() - now;
      const route = request.route.path;

      this.prometheusService.sendMetrics.labels(route).observe(duration / 1000);
    }));
  }
}
