import styles from './SubmitButton.module.scss';

export default function SubmitButton(){
    return (
        <button type='submit' className={styles.submitButton} aria-label='Enviar Dados'>
            Enviar
        </button>
    )
}