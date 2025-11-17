import mongoose from 'mongoose';

const cepSchema = new mongoose.Schema({
	cep: {
		type: String,
		required: true,
		unique: true,
		match: /^\d{5}-?\d{3}$/,
	},
	logradouro: { type: String, default: '' },
	bairro: { type: String, default: '' },
	cidade: { type: String, default: '' },
	uf: { type: String, default: '' },
}, { timestamps: true });

const Cep = mongoose.model('Cep', cepSchema, 'ceps');

export default Cep;
