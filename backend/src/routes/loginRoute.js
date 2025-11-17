import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from '../models/usuarioModel.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/token', 
    [
        body('email')
            .trim()  
            .normalizeEmail()  
            .isEmail()
            .withMessage('Email inválido'),

        body('senha')
            .trim()  
            .isLength({ min: 6 })
            .withMessage('A senha deve ter pelo menos 6 caracteres')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },

    async (req, res) => {
        const { email, senha } = req.body;
        try {
            const usuario = await Usuario.findOne({ email });
            if (!usuario) {
                return res.status(403).json({ message: 'Credenciais inválidas' });
            }
            const senhasIguais = await bcrypt.compare(senha, usuario.senha);
            if (!senhasIguais) {
                return res.status(403).json({ message: 'Credenciais inválidas' });
            }
            const payload = {
                id: usuario._id,
                email: usuario.email,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET || 'fusca', {
                expiresIn: process.env.JWT_EXPIRATION || '1h', 
            });
            return res.json({
                token,
                user: payload,
                expiresIn: process.env.JWT_EXPIRATION || 3600,
            });

        } catch (err) {
            console.error('Erro ao gerar token de login:', err);
            return res.status(500).json({ message: 'Erro no servidor' });
        }
    }
);



export default router;