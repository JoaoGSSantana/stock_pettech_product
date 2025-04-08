import { Injectable } from "@nestjs/common";

import * as prometheus from "prom-client";

@Injectable()
export class PrometheusService {
    private httpRequestDurationMicroseconds: prometheus.Histogram<'route'>

    constructor() {
        this.httpRequestDurationMicroseconds = new prometheus.Histogram({
            name: 'http_request_duration_seconds',
            help: 'Duration of HTTP requests in seconds',
            labelNames: ['route'],
            buckets: [0.1, 0.5, 1, 2, 5, 10],
        });
    }


    get sendMetrics () {
        return this.httpRequestDurationMicroseconds
    }
}