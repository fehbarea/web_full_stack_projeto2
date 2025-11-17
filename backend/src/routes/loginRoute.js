import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from '../models/usuarioModel.js';

async function gerarToken(req, res) {
    const { email, senha } = req.body;
    try {
        if (email == null || senha == null) {
            return res.status(401).json({ message: 'Email e senha são obrigatórios' });
        }
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
            expiresIn: '1h',
        });

        return res.json({ token, user: payload, expiresIn: 3600 });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
}

const router = express.Router();

router.post('/token', gerarToken);



export default router;