import styles from './CardValue.module.scss'

interface Props {
    text: string,
    value: string
}

export default function CardValue({text, value}:Props){
    return (
        <div className={styles.card}>
            <span className={styles.cardtext}>{text}</span> 
            <span className={styles.cardvalue}>{value}</span>
        </div>
    )
}