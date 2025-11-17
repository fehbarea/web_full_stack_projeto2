import axios from 'axios';

const buscaCep = async (estado, cidade, rua) => {
    try {
        const url = `https://viacep.com.br/ws/${estado}/${cidade}/${rua}/json/`;
        const response = await axios.get(url);

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
