import { Queue, Worker } from 'bullmq';
import { QueueService } from './queue.interface';

export class BullMQAdapter implements QueueService {
    private queue: Queue;
    private worker: Worker | undefined;

    constructor(queueName: string, connection: any) {
        this.queue = new Queue(queueName, { connection });
    }

    async addJob(name: string, data: any, options?: any): Promise<void> {
        await this.queue.add(name, data, {
            delay: options?.delay,
            jobId: options?.jobId, // Use for deduplication
            removeOnComplete: true
        });
    }

    processJob(name: string, handler: (job: any) => Promise<void>): void {
        this.worker = new Worker(this.queue.name, async (job) => {
            if (job.name === name) {
                await handler(job);
            }
        }, { connection: this.queue.opts.connection });

        this.worker.on('failed', (job, err) => {
            console.error(`Job ${job?.id} failed with error ${err.message}`);
        });
    }
}
