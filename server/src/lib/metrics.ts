import client from 'prom-client';

// Create a Registry
export const register = new client.Registry();

// Add default metrics (CPU, RAM, Event Loop)
client.collectDefaultMetrics({ register });

// HTTP Request Duration Histogram
export const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10], // Discretize latency
    registers: [register],
});

// Business Metric: Reminders Sent
export const remindersSentTotal = new client.Counter({
    name: 'reminders_sent_total',
    help: 'Total number of reminders sent',
    labelNames: ['type', 'tenantId', 'status'],
    registers: [register],
});
