import { Request, Response, NextFunction } from 'express';
import { httpRequestDurationMicroseconds } from '../lib/metrics';

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime();

    res.on('finish', () => {
        const duration = process.hrtime(start);
        const durationInSeconds = (duration[0] * 1e9 + duration[1]) / 1e9;

        const route = req.route ? req.route.path : req.path;

        httpRequestDurationMicroseconds
            .labels(req.method, route, res.statusCode.toString())
            .observe(durationInSeconds);
    });

    next();
};
