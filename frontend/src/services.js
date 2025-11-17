import axios from 'axios';
import { login } from './contexts/authSlice';

export async function adicionarCep(cepData, token) {

    try {
        const response = await axios.post('http://localhost:5000/cep', cepData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar CEP: ' + error.message);
        throw error;
    }
};

export async function realizaLogin(data, dispatch, navigate) {
    try {
        const response = await axios.post(
            'http://localhost:5000/login/token', 
            {
                email: data.email,
                senha: data.senha
            }
        );

        const responseData = response.data;
        const { token } = responseData;

        dispatch(login({
            email: data.email,
            token: token,
            timestamp: new Date().toISOString()
        }));

        console.log('Login realizado com sucesso');

        navigate('/endereco');

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Falha ao fazer login. Verifique suas credenciais.');
    }
}

export async function buscaCep(estado, cidade, rua, token){
    try {
        const url = `http://localhost:5000/cep/${estado}/${cidade}/${rua}/json/`;
        const response = await axios.get(url,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.length === 0) {
            return [];
        }

        return response.data.map(dados => ({
            cep: dados.cep,
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            localidade: dados.localidade,
            estado: dados.estado,
        }));

    } catch (error) {
        console.error('Erro serviceCEP: ' + error.message);
        throw error;
    }
};

export default buscaCep;

