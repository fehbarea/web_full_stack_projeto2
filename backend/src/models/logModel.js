import mongoose from 'mongoose';

// Define o schema do Log
const logSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true, 
  },
  mensagem: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  ip: {
    type: String,
    required: true,
  },
  detalhes: {
    type: String,
    default: '',
  },
});

const LogModel = mongoose.model('Log', logSchema, 'logs');

export default LogModel;
