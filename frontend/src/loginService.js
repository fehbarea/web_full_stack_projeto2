import { login } from './contexts/authSlice';

export async function realizaLogin(data, dispatch, navigate) {
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                senha: data.senha
            })
        });

        if (!response.ok) {
            throw new Error('Erro na autenticação');
        }

        const responseData = await response.json();
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