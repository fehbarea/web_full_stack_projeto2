import mongoose from 'mongoose';

const voluntarioSchema = new mongoose.Schema({
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

const Voluntario = mongoose.model('Voluntario', voluntarioSchema, 'voluntarios');

export default Voluntario;
