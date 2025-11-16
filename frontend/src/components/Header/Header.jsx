import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.logo}>📦Busca CEP📦</h1>
                <nav className={styles.nav}>
                    <ul>
                        <li>Daniel Jacob & Felipe Alves</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;