import ClientTable from '../clients/ClientTable';
import styles from './Sections.module.scss'
interface Venda {
    valor: number;
}

interface Cliente {
    vendas: Venda[];
    nomeCompleto: string
}

interface ClientsSectionsProps {
    data: Cliente[];
}
export default function ClientsSections({data}: ClientsSectionsProps){

    return (
        <section className={styles.clientsSection}>
            <ClientTable data={data}/>
        </section>
    )
}