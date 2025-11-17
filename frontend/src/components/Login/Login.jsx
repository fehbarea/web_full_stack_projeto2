import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import style from "./Login.module.css";
import Submit from "../Submit/";
import Input from '../Input';
import Header from '../Header/Header';
import { realizaLogin } from '../../services.js';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function onSubmit(data) {
        await realizaLogin(data, dispatch, navigate);
        navigate('/endereco');
    }

    return (
        <>
            <Header />
            <section className={style.page}>
                <h1>Login</h1>
                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label='Email'
                        name='email'
                        errors={errors}
                        validationRules={{
                            required: 'Campo Obrigatório',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Email inválido'
                            }
                        }}
                        register={register}
                    />
                    <Input
                        label='Senha'
                        name='senha'
                        type='password'
                        errors={errors}
                        validationRules={{
                            required: 'Campo Obrigatório',
                            minLength: {
                                value: 4,
                                message: 'Senha deve ter pelo menos 6 caracteres'
                            }
                        }}
                        register={register}
                    />
                    <Submit
                        label='Entrar'
                        type="submit"
                    />
                </form>
            </section>
        </>
    );
}

export default Login;
