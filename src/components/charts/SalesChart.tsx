
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

interface Props {
  data: { data: string; total: number }[];
}

export default function SalesChart({ data }: Props) {

    const [width, setWidth] = useState(getWidth());

    function getWidth() {
        return window.innerWidth >= 768 ? '49%' : '100%';
    }

    useEffect(() => {
        const handleResize = () => setWidth(getWidth());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <div style={{ width: width, height: 300, marginTop: '40px' }}>
      <h3 style={{fontSize: '1rem'}}>Quantidade de Vendas por Dia</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dataC" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#48C97C" fillOpacity={0.7} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
