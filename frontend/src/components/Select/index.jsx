import style from './Select.module.css';

function Select({label, name, register, errors, options, validationRules, className, ...rest}) {
    return (
        <div className={`${style.Select} ${className}`}  >
            <label htmlFor={name}>{label}</label>
            <select id={name} {...register(name, validationRules)} {...rest}>
            <option value="">Selecione uma opção</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {errors[name] && <span className={style.errorMessage}>{errors[name].message}</span>}
        </div>

    );
}

export default Select;
