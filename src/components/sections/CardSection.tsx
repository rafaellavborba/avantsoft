import CardValue from "../default/CardValue"
import { useEffect, useState } from "react"
import styles from './Sections.module.scss'
interface Venda {
    valor: number;
}

interface Cliente {
    vendas: Venda[];
}

interface CardSectionProps {
    data: Cliente[];
}

export default function CardSection({ data }: CardSectionProps){
    const [totalSales, setSales] = useState<number>(0)
    const [numberSales, setNumberSales] = useState<number>(0)

    const handleStatistcs = () => {
        const clients = structuredClone(data) as []
        if(clients && clients.length){
            const sales = clients?.reduce((acc, client:any) => {
            const clientSales = client.vendas.reduce((s:number, v:any) => s + v.valor, 0)
                return acc + clientSales
            }, 0)

            const numberSales = clients?.reduce((acc: number, client: any) => {
                return acc + (client.vendas?.length || 0);
            }, 0);

            setSales(sales)   
            setNumberSales(numberSales)
        }
        
    }
    useEffect(() => {
        if(data && data.length){
            handleStatistcs()
        }
    }, [data])
    return (
        <section className={styles.cardSection}>
            <CardValue text={'Total das vendas:'} value={`R$ ${totalSales}`} />
            <CardValue text={'Média por venda:'} value={`R$ ${(totalSales/numberSales) }`} />
            <CardValue text={'Número de vendas:'} value={`${numberSales}`} />
            <CardValue text={'Clientes ativos:'} value={`${data?.length || 0}`} />
        </section>
    )
}