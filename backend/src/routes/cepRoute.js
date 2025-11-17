import express from 'express';
import jwt from 'jsonwebtoken';
import { body, param, validationResult } from 'express-validator';
import axios from 'axios';
import Cep from '../models/cepModel.js';

const router = express.Router();

router.get('/cep/:estado/:cidade/:logradouro/json', authMiddleware,
    [
        param('estado')
            .isLength({ min: 2, max: 2 })
            .withMessage('O estado deve ter exatamente 2 caracteres'),

        param('cidade')
            .isLength({ min: 3 })
            .withMessage('O nome da cidade deve ter pelo menos 3 caracteres'),

        param('logradouro')
            .isLength({ min: 3 })
            .withMessage('O logradouro deve ter pelo menos 3 caracteres')
            .customSanitizer(value => value.replace(/\+/g, ' ')) // opcional: converte + em espaço
    ],
    verificarErros,
    (req, res) => {

        const { estado, cidade, logradouro } = req.params;
        const url = `https://viacep.com.br/ws/${estado}/${cidade}/${logradouro}/json/`;
        axios.get(url)
            .then(response => {
                if (response.data.erro) {
                    return res.status(404).json({ message: 'CEP não encontrado' });
                }
                res.json(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                res.status(500).json({ message: 'Erro ao buscar CEP' });
            });
    }
);


router.post('/cep', authMiddleware,
    [
        body('cep')
            .matches(/^\d{5}\d{3}$/)
            .withMessage('CEP inválido. Formato esperado: 12345678'),
    ],
    verificarErros,

    async (req, res) => {
        const { cep, logradouro, bairro, cidade, uf } = req.body;
        try {
            const existente = await Cep.findOne({ cep });
            if (existente) {
                return res.status(409).json({ message: 'CEP já existe na base de dados' });
            }
            const novoCep = new Cep({ cep, logradouro, bairro, cidade, uf });
            novoCep.save();
            res.status(201).json({ cep, logradouro, bairro, cidade, uf });
        } catch (err) {
            console.error('Erro ao adicionar CEP:', err);
            return res.status(500).json({ message: 'Erro no servidor' });
        }


    }
);


//Funções Auxiliares------

function verificarErros(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação ausente ou inválido' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fusca");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token de autenticação inválido' });
    }
};


//------------------------

export default router;