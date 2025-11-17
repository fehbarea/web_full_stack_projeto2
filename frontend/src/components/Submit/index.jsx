import style from './Submit.module.css'

function Submit({ label, handleSubmit, ...props }) {
    return (
        <span>
            <button className={style.submit} handleSubmit={handleSubmit} {...props} >{label}</button>
        </span>
    );
}

export default Submit;