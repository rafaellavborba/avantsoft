import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import styles from './styles/LoginPage.module.scss';
import InputDefault from '../components/default/InputDefault';
import SubmitButton from '../components/default/SubmitButton';
import { useState } from 'react';
export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<{ user: string; password: string }>({ user: '', password: '' })
  const [errorArr, setError] = useState<any>([])

  const handleLogin = () => {
    const {user, password} = formData
    const errors = []
    if(!user) errors.push('user')
    if(!password) errors.push('password')
    const success = login(user, password)
    if (!success) {
       errors.push('login')
    }

    setError(errors)
    if(errors.length) return 
    navigate('/dashboard')
  }
  const handleChange = (event: any) => {
     const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    removeErrors(name);
  }
  const removeErrors = (fieldName: string) => {
    if (errorArr.includes(fieldName) || errorArr.includes('login')) {
      const filteredErrors = errorArr.filter((err) => err !== fieldName && err !== 'login');
      setError(filteredErrors);
    }
  };
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContent}>
          <span className={styles.title}>Bem-vindo(a)</span>
          
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className={styles.inputContent}>
              <InputDefault 
                placeholderProps='Digite o seu usuário' 
                labelProps={'Usuário:'} 
                valueProps={formData.user} 
                handleChange={handleChange} 
                nameProps={'user'}
                typeProps={'text'}
                error={errorArr.includes('user')}
              />
            </div>
            <div className={styles.inputContent}>
              <InputDefault 
                placeholderProps='Digite sua senha' 
                labelProps={'Senha:'} 
                valueProps={formData.password} 
                handleChange={handleChange}
                nameProps={'password'}
                typeProps={'password'}
                error={errorArr.includes('password')}
              />
            </div>
            <div className={styles.inputContent}>
              {errorArr.includes('login') && <span className={styles.errorMessage}>Usuário ou senha incorreto</span>}
              <SubmitButton />
            </div>
          </form>

      </div>
    </div>
  )
}
