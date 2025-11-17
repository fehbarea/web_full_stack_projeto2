import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/cep/*params', authMiddleware, (req, res) => {
    res.status(501).json({ message: 'Endpoint de CEP não implementado ainda' });
});

router.post('/cep', authMiddleware, (req, res) => {
    res.status(501).json({ message: 'Endpoint de CEP não implementado ainda' });
});

function authMiddleware (req, res, next){
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação ausente ou inválido' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token de autenticação inválido' });
    }
};

export default router;