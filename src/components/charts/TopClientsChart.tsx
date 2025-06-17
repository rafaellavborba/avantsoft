


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState, useEffect } from "react";

interface Venda {
  data: string;
  valor: number;
}

interface Client {
  total_vendas: any;
  quantidade_vendas: any;
  nomeCompleto: string;
  vendas: Venda[];
}

interface TopClientsChartProps {
  clients: Client[];
}

type ChartMode = 'volume' | 'media' | 'frequencia';

export const TopClientsChart: React.FC<TopClientsChartProps> = ({ clients }) => {
  const [sorted, setSorted] = useState<any[]>([]);
  const [mode, setMode] = useState<ChartMode>('volume');
  const [width, setWidth] = useState(getWidth());

  function getWidth() {
    return window.innerWidth >= 768 ? '49%' : '100%';
  }

  useEffect(() => {
    const handleResize = () => setWidth(getWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (clients && clients.length) {
      let data: any[] = [];

      if (mode === 'volume') {
        data = clients.map((client) => ({
          nome: client.nomeCompleto,
          total: client.total_vendas,
        }));
      }

      if (mode === 'media') {
        data = clients.map((client) => {
          const total = client.total_vendas;
          const media = total > 0 ? total / client.quantidade_vendas : 0;
          return {
            nome: client.nomeCompleto,
            total: parseFloat(media.toFixed(2)),
          };
        });
      }

      if (mode === 'frequencia') {
        data = clients.map((client) => ({
          nome: client.nomeCompleto,
          total: client.quantidade_vendas,
        }));
      }

      const sort = data.sort((a, b) => b.total - a.total).slice(0, 5); // top 5
      setSorted(sort);
    }
  }, [clients, mode]);

  return (
    <div style={{ ...styles.topClients, width: width }}>
      <h3 style={{ fontSize: '1rem' }}>
        {mode === 'volume' && 'Clientes com maior volume de vendas'}
        {mode === 'media' && 'Clientes com maior média por venda'}
        {mode === 'frequencia' && 'Clientes com maior frequência de compras'}
      </h3>
      
      <ResponsiveContainer height={250}>
        <BarChart data={sorted}>
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#48C97C">
            {sorted.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#48C97Ccc" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div style={styles.buttonsContent}>
        <button 
          onClick={() => setMode('volume')} 
          style={{...styles.button, ...(mode === 'volume' ? styles.active : {})}}
        >
          Volume de Vendas
        </button>
        <button 
          onClick={() => setMode('media')} 
          style={{...styles.button, ...(mode === 'media' ? styles.active : {})}}
        >
          Média por Venda
        </button>
        <button 
          onClick={() => setMode('frequencia')} 
          style={{...styles.button, ...(mode === 'frequencia' ? styles.active : {})}}
        >
          Frequência de Compras
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
    topClients: {
      height: '350px', 
      marginTop: '40px'
    },
    buttonsContent: { marginTop: 10, display: 'flex', gap: 8 },
    button: {
      fontSize: '0.65rem',
      borderRadius: '8px',
      border: 'none',
      boxShadow: '4px 4px 4px 0px #0003',
      padding: '8px'
    },
    active: {
      backgroundColor: '#48C3F0'
    }
}