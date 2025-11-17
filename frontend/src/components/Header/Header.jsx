import style from './Header.module.css';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()

    return (
        <header className={style.header}>
            <div className={style.container}>
                <h1 className={style.logo}>📦Busca CEP📦</h1>
                <nav className={style.nav}>
                    <ul>
                        <li>Daniel Jacob & Felipe Alves</li>
                        <li><button className={style.button} onClick={() => navigate("/adicionar-cep")} >Adicionar CEP</button></li>
                        <li><button className={style.button} onClick={() => navigate("/endereco")} >Bucar CEP</button></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;