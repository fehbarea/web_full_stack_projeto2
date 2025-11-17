import { useForm } from 'react-hook-form';
import style from './FormAdicionarCep.module.css'
import Submit from "../Submit/";
import Input from '../Input';
import Select from "../Select";
import Header from "../Header/Header.jsx";
import { adicionarCep } from '../../services.js';
import { useSelector } from 'react-redux';

function FormAdicionarCep() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { token } = useSelector(state => state.auth);

    const estadosBrasileiros = [
        { label: 'Acre', value: 'AC' },
        { label: 'Alagoas', value: 'AL' },
        { label: 'Amapá', value: 'AP' },
        { label: 'Amazonas', value: 'AM' },
        { label: 'Bahia', value: 'BA' },
        { label: 'Ceará', value: 'CE' },
        { label: 'Distrito Federal', value: 'DF' },
        { label: 'Espírito Santo', value: 'ES' },
        { label: 'Goiás', value: 'GO' },
        { label: 'Maranhão', value: 'MA' },
        { label: 'Mato Grosso', value: 'MT' },
        { label: 'Mato Grosso do Sul', value: 'MS' },
        { label: 'Minas Gerais', value: 'MG' },
        { label: 'Pará', value: 'PA' },
        { label: 'Paraíba', value: 'PB' },
        { label: 'Paraná', value: 'PR' },
        { label: 'Pernambuco', value: 'PE' },
        { label: 'Piauí', value: 'PI' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Rio Grande do Norte', value: 'RN' },
        { label: 'Rio Grande do Sul', value: 'RS' },
        { label: 'Rondônia', value: 'RO' },
        { label: 'Roraima', value: 'RR' },
        { label: 'Santa Catarina', value: 'SC' },
        { label: 'São Paulo', value: 'SP' },
        { label: 'Sergipe', value: 'SE' },
        { label: 'Tocantins', value: 'TO' }
    ];

    async function onSubmit(data) {
        try {
            await adicionarCep({
                cep: data.cep,
                logradouro: data.logradouro,
                bairro: data.bairro,
                cidade: data.cidade,
                uf: data.uf
            },token);
            reset(); 
        } catch (err) {
            console.error('Falha ao adicionar CEP:', err);
        }
    }

    return (
        <>
            <Header />
            <section className={style.page}>
                <h1>Adicionar novo CEP</h1>
                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label='CEP'
                        name='cep'
                        placeholder='12345678'
                        errors={errors}
                        validationRules={{
                            required: 'Campo Obrigatório',
                            pattern: {
                                value: /^\d{5}\d{3}$/,
                                message: 'CEP inválido. Formato esperado: 12345678'
                            }
                        }}
                        register={register}
                    />
                    <Input
                        label='Logradouro'
                        name='logradouro'
                        errors={errors}
                        validationRules={{ required: 'Campo Obrigatório', minLength: { value: 3, message: 'Logradouro deve ter pelo menos 3 caracteres' } }}
                        register={register}
                    />
                    <Input
                        label='Bairro'
                        name='bairro'
                        errors={errors}
                        validationRules={{ required: 'Campo Obrigatório', minLength: { value: 3, message: 'Bairro deve ter pelo menos 3 caracteres' } }}
                        register={register}
                    />
                    <Input
                        label='Cidade'
                        name='cidade'
                        errors={errors}
                        validationRules={{ required: 'Campo Obrigatório', minLength: { value: 3, message: 'Cidade deve ter pelo menos 3 caracteres' } }}
                        register={register}
                    />
                    <Select
                        label='UF'
                        name='uf'
                        register={register}
                        errors={errors}
                        options={estadosBrasileiros}
                        validationRules={{ required: 'Campo Obrigatório' }}
                    />
                    <Submit
                        label='Adicionar CEP'
                        type="submit"
                    />
                </form>
            </section>
        </>
    );
}

export default FormAdicionarCep;
