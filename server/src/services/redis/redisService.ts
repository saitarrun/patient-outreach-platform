import { Redis } from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
});

export const redisClient = redis;

export const acquireLock = async (key: string, ttlSeconds: number): Promise<boolean> => {
    const result = await redis.set(key, 'LOCKED', 'EX', ttlSeconds, 'NX');
    return result === 'OK';
};

export const releaseLock = async (key: string): Promise<void> => {
    await redis.del(key);
};

export const checkIdempotencyKey = async (key: string): Promise<boolean> => {
    const exists = await redis.exists(key);
    return exists === 1;
};

export const setIdempotencyKey = async (key: string, ttlSeconds: number): Promise<void> => {
    await redis.set(key, 'PROCESSED', 'EX', ttlSeconds);
};
