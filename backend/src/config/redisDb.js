import Redis from 'ioredis';

const redis = new Redis({
    host: 'localhost',  
    port: 6379,         
    db: 0,              
    maxRetriesPerRequest: null, 
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000); 
        console.log(`Tentando reconectar ao Redis após ${delay}ms`);
        return delay;
    },
    connectionName: 'my-app-redis-client', 
});

redis.on('connect', () => {
    console.log('Conectado ao Redis com sucesso!');
});

redis.on('error', (err) => {
    console.error('Erro ao conectar ao Redis:', err);
});

export default redis;
