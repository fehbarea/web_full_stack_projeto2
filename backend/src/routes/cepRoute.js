import express from 'express';
import jwt from 'jsonwebtoken';
import { body, param, validationResult } from 'express-validator';
import Cep from '../models/cepModel.js';
import Log from '../models/logModel.js';
import redisClient from '../config/redisClient.js';
const router = express.Router();

// Rota para buscar o CEP
router.get('/cep/:estado/:cidade/:logradouro/json', authMiddleware,
    [
        param('estado')
            .isLength({ min: 2, max: 2 })
            .withMessage('O estado deve ter exatamente 2 caracteres')
            .trim()
            .escape(),

        param('cidade')
            .isLength({ min: 3 })
            .withMessage('O nome da cidade deve ter pelo menos 3 caracteres')
            .trim()
            .escape(),

        param('logradouro')
            .isLength({ min: 3 })
            .withMessage('O logradouro deve ter pelo menos 3 caracteres')
            .trim()
            .escape()
            .customSanitizer(value => value.replace(/\+/g, ' ')) // Substitui "+" por espaços
    ],
    verificarErros,
    async (req, res) => {
        try {
            salvarLog('Busca de CEP', `Busca de CEP para ${req.params.logradouro}, ${req.params.cidade}-${req.params.estado}`, req.ip, `Parâmetros: ${JSON.stringify(req.params)}`);
            const { estado, cidade, logradouro } = req.params;

            const cacheKey = `cep:${estado}:${cidade}:${logradouro}`;
            const cachedData = await redisClient.get(cacheKey);

            if (cachedData) {
                console.log('Cache hit');
                return res.json(JSON.parse(cachedData));
            }

            const resultados = await Cep.find({
                uf: estado.toUpperCase(),
                cidade: new RegExp(`^${cidade}`, 'i'),
                logradouro: new RegExp(logradouro, 'i')
            }).lean();

            if (!resultados || resultados.length === 0) {
                return res.status(404).json({ message: 'Nenhum CEP encontrado no banco de dados' });
            }

            // Salva no cache
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(resultados));
            return res.json(resultados);
        } catch (err) {
            console.error('Erro ao processar a requisição:', err);
            return res.status(500).json({ message: 'Erro no servidor' });
        }
    }
);

// Rota para adicionar um novo CEP
router.post('/cep', authMiddleware,
    [
        body('cep')
            .matches(/^\d{5}-?\d{3}$/)
            .withMessage('CEP inválido. Formato esperado: 12345-678 ou 12345678')
            .customSanitizer(value => value.replace(/[^0-9]/g, '')), // Remove qualquer caractere não numérico

        body('logradouro')
            .trim()
            .escape(),

        body('bairro')
            .trim()
            .escape(),

        body('cidade')
            .trim()
            .escape(),

        body('uf')
            .optional()
            .isLength({ min: 2, max: 2 })
            .withMessage('UF inválido. Deve ter 2 caracteres')
            .trim()
            .escape()
    ],
    verificarErros,
    async (req, res) => {
        let { cep, logradouro, bairro, cidade, uf } = req.body;
        cep = cep ? cep.trim() : '';
        logradouro = logradouro ? logradouro.trim() : '';
        bairro = bairro ? bairro.trim() : '';
        cidade = cidade ? cidade.trim() : '';
        uf = uf ? uf.toUpperCase().trim() : '';

        console.log("Bairro: " + bairro);
        try {
            salvarLog('Adição de CEP', `Tentativa de adicionar CEP ${cep}`, req.ip, `Dados: ${JSON.stringify(req.body)}`);
            const existente = await Cep.findOne({ cep });
            if (existente) {
                return res.status(409).json({ message: 'CEP já existe na base de dados' });
            }
            const novoCep = new Cep({ cep, logradouro, bairro, cidade, uf });
            await novoCep.save();
            res.status(201).json({ cep, logradouro, bairro, cidade, uf });
        } catch (err) {
            console.error('Erro ao adicionar CEP:', err);
            return res.status(500).json({ message: 'Erro no servidor' });
        }
    }
);

// Funções Auxiliares

// Função para verificar erros das validações
function verificarErros(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

// Middleware de autenticação
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        salvarLog('Erro de Autenticação', 'Token ausente ou inválido', req.ip, 'Tentativa de acesso sem token');
        return res.status(401).json({ message: 'Token de autenticação ausente ou inválido' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fusca");
        req.user = decoded;
        next();
    } catch (err) {
        salvarLog('Erro de Autenticação', 'Token inválido', req.ip, 'Tentativa de acesso com token inválido');
        return res.status(401).json({ message: 'Token de autenticação inválido' });
    }
}

// Função para salvar logs de atividades
function salvarLog(tipo, mensagem, ip, detalhes) {
    const logEntry = new Log({ tipo, mensagem, ip, detalhes });
    logEntry.save().catch(err => {
        console.error('Erro ao salvar log:', err);
    });
}

export default router;
