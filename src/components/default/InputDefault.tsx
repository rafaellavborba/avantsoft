import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; 
import styles from './InputDefault.module.scss';

interface Props {
  placeholderProps: string;
  labelProps: string;
  valueProps: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nameProps: string;
  typeProps?: string;
  error?: boolean;
  stylesProps?: any;
}

export default function InputDefault({
  placeholderProps,
  labelProps,
  valueProps,
  handleChange,
  nameProps,
  typeProps = 'text',
  error = false,
  stylesProps = null
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = typeProps === 'password';
  const inputType = isPassword && !showPassword ? 'password' : 'text';

  return (
    <div className={`${styles.inputWrapper} ${error ? styles.error : ''}`}>
      <label className={styles.label} style={stylesProps} htmlFor={nameProps}>{labelProps}</label>
      <div className={styles.inputWithIcon}>
        <input
          type={inputType}
          placeholder={placeholderProps}
          value={valueProps}
          name={nameProps}
          onChange={handleChange}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eyeButton}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
        {
            error && <span className={styles.errorMessage}>Esse campo é obrigatório</span>
        }
      </div>
    </div>
  );
}
