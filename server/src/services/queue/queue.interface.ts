export interface QueueService {
    addJob(name: string, data: any, options?: any): Promise<void>;
    processJob(name: string, handler: (job: any) => Promise<void>): void;
}
