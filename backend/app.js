import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

//ROTAS
import loginRoute from './src/routes/loginRoute.js';
import cepRoute from './src/routes/cepRoute.js';


dotenv.config();
const app = express();

app.use(express.json())

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//ROTAS
app.use('/login', loginRoute);
app.use('/api', cepRoute);

export default app;