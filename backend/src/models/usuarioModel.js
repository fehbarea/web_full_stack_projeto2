import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
},{
    toJSON: {
        transform: (doc, ret) => {
            delete ret.senha;
            return ret;
        }
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');

export default Usuario;
