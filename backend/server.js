import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import initConfig from './src/config/initConfig.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        await initConfig();

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (err) {
        console.error('Erro ao iniciar o servidor:', err);
    }
};

startServer();
