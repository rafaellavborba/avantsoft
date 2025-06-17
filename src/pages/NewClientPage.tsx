import { useState } from "react";
import styles from './styles/NewClientPage.module.scss'
import SubmitButton from "../components/default/SubmitButton";
import InputDefault from "../components/default/InputDefault";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import firstLetter from "../utils/firstLetter";
import { postClient } from "../store/actions/clients";

interface Cliente {
  nomeCompleto: string;
  email: string;
  nascimento: string;
}

export default function AddClientForm() {
   const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<Cliente>({
    nomeCompleto: "",
    email: "",
    nascimento: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nomeCompleto || !formData.email || !formData.nascimento) {
      alert("Preencha todos os campos!");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert("Digite um e-mail válido!");
      return;
    }

    const sendC = {
      ...formData,
      vendas: [],
      total_vendas: 0,
      quantidade_vendas: 0,
      letra_ausente: firstLetter(formData.nomeCompleto)
    };

    dispatch(postClient(sendC));
    navigate('/dashboard');
  };

  return (
    <div className={styles.newClient}>
        <form className={styles.addClientForm} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Adicionar Novo Cliente</h2>

            <div className={styles.formGroup}>
                <InputDefault 
                    placeholderProps="Digite o nome"
                    labelProps="Nome"
                    valueProps={formData.nomeCompleto}
                    handleChange={handleChange}
                    nameProps="nomeCompleto"
                    stylesProps={{color: 'black'}}
                />
            </div>

            <div className={styles.formGroup}>
                <InputDefault 
                    placeholderProps={"Digite o email"} 
                    labelProps={"Email"} 
                    valueProps={formData.email} 
                    handleChange={handleChange} 
                    nameProps={"email"} 
                    typeProps="email"
                    stylesProps={{color: 'black'}}
                />
            </div>
            <div className={styles.formGroup}>
                <InputDefault 
                    placeholderProps={"Digite a Data"} 
                    labelProps={"Data de Nascimento"} 
                    valueProps={formData.nascimento} 
                    handleChange={handleChange} 
                    nameProps={"nascimento"} 
                    stylesProps={{color: 'black'}}
                    typeProps="date"
                />
            </div>

            <SubmitButton  />
        </form>
    </div>
    
  );
}
