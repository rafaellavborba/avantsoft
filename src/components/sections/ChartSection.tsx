import { useEffect, useState } from "react";
import styles from './Sections.module.scss'
import SalesChart from "../charts/SalesChart";
import { TopClientsChart } from "../charts/TopClientsChart";
import formattedDate from '../../utils/formattedDate'
type Venda = {
    data: string;
    valor: number;
};

type Client = {
    vendas?: Venda[];
};

interface ChartSectionProps {
    data: Client[];
}

export default function ChartSection({data}: ChartSectionProps){
    const [salesByDay, setSalesByDay] = useState<{ data: string; total: number }[]>([])
    
    const handleSales = () => {
        const clients = structuredClone(data)
        if(clients && clients.length){
            
            const salesByDay = clients.reduce((acc: Record<string, number>, client: any) => {
                client.vendas?.forEach((venda: any) => {
                    const dataBr = formattedDate(venda.data);
                    acc[dataBr] = (acc[dataBr] || 0) + venda.valor;
                });
                return acc;
            }, {});

            const chartData = Object.entries(salesByDay).map(([dataC, total]) => ({
                dataC,
                total: Number(total),
            }));
            
            setSalesByDay(chartData)
        }
    }

    useEffect(() => {
        if(data && data.length){
            handleSales()
        }
    },[data])
    return (
        <section className={styles.graphSection}>
            {salesByDay && salesByDay.length && <SalesChart data={salesByDay} />}
            <TopClientsChart clients={data}/>
        </section>
    )
}

