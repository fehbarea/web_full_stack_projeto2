import redis from 'redis';

const redisClient = redis.createClient({
    url: 'redis://localhost:6379' 
});

redisClient.on('error', (err) => {
    console.log('Erro ao conectar com o Redis:', err);
});

redisClient.connect();

export default redisClient;
