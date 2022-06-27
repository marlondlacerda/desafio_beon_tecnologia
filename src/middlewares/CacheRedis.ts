import Redis, { RedisOptions } from 'ioredis';

require('dotenv/config');

const config: RedisOptions = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  keyPrefix: 'cache:',
};

class CacheRedis<T> {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(config);
  }

  readonly get = async (key: string) => {
    const value = await this.redis.get(key);

    return value ? JSON.parse(value) : null;
  };

  set(key: string, value: T[] | object, timeExp: number) {
    return this.redis.set(key, JSON.stringify(value), 'EX', timeExp);
  }

  del(key: string) {
    return this.redis.del(key);
  }

  async delPrefix(prefix: string) {
    const keys = (await this.redis.keys(`cache:${prefix}:*`)).map((key) =>
      key.replace('cache:', ''));

    return this.redis.del(keys);
  }
}

export default CacheRedis;
