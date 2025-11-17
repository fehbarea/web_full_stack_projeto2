import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import initConfig from './src/config/initConfig.js';
import redis from './src/config/redisDb.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        redis.ping().then((response) => {
            console.log('Resposta do Redis:', response); 
        }).catch((err) => {
            console.error('Erro ao conectar ao Redis:', err);
        });

        await initConfig();

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (err) {
        console.error('Erro ao iniciar o servidor:', err);
    }
};

startServer();
