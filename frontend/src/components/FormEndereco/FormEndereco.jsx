import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import style from "./FormEndereco.module.css";
import Submit from "../Submit/";
import Input from '../Input';
import Select from "../Select";
import Header from "../Header/Header.jsx";
import { consultarEndereco } from '../../contexts/enderecoSlice';
import { useNavigate } from 'react-router-dom';

function FormEndereco() {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { ceps, status, error } = useSelector(state => state.endereco);
    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate()

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
            await dispatch(consultarEndereco({
                estado: data.estado,
                cidade: data.cidade,
                rua: data.rua,
                token
            })).unwrap();
        } catch (err) {
            console.error('Falha ao consultar endereço:', err);
        }
    }

    return (
        <>
            <Header />
            <section className={style.page}>
            <h1>Buscador de CEP</h1>
        <form id='FormCadastroOficina' className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <Select
                label='Estado'
                name='estado'
                register={register}
                errors={errors}
                options={estadosBrasileiros}
                validationRules={{ required: 'Campo Obrigatório' }}
            />
             <Input
                label='Cidade'
                name='cidade'
                errors={errors}
                validationRules={{ required: 'Campo Obrigatório', minLength: { value: 3, message: 'Cidade deve ter pelo menos 3 caracteres' } }}
                register={register}
            />
            <Input
                label='Rua'
                name='rua'
                errors={errors}
                validationRules={{ required: 'Campo Obrigatório', minLength: { value: 3, message: 'Bairro deve ter pelo menos 3 caracteres' } }}
                register={register}
            />
                <Submit
                    label={status === 'loading' ? 'Buscando...' : 'Buscar Cep'}
                    type="submit"
                    disabled={status === 'loading'}
                />

        </form>

        {/* Exibição dos resultados */}
        {status === 'loading' && <p>Carregando...</p>}
        {status === 'failed' && <p>Erro: {error}</p>}
        {status === 'succeeded' && (
            <div className={style.results}>
                <h3>{ceps.length} CEPs Encontrados:</h3>
                {ceps.length === 0 ? (
                    <p>Nenhum CEP encontrado para o endereço informado.</p>
                ) : (
                    <ul>
                        {ceps.map((cep, index) => (
                            <li key={index}>
                                <p>CEP: {cep.cep}</p>
                                <p>Logradouro: {cep.logradouro}</p>
                                <p>Bairro: {cep.bairro}</p>
                                <p>Cidade: {cep.localidade}</p>
                                <p>Estado: {cep.estado}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )}
        </section>
        </>
    );
}

export default FormEndereco;