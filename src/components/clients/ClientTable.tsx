import { useEffect, useState, type ReactNode } from "react";

interface Venda {
  valor: number;
}

interface Cliente {
  letra_faltando: ReactNode;
  total_vendas: any;
  nascimento: ReactNode;
  email: ReactNode;
  vendas: Venda[];
  nomeCompleto: string;
  [key: string]: any;
}

interface ClientTableProps {
  data: Cliente[];
}

export default function ClientTable({ data }: ClientTableProps) {
  const [newList, setList] = useState<Cliente[]>([]);
  const formattedKeys = {
    nomeCompleto: "Nome",
    email: "Email",
    nascimento: "Nascimento",
    quantidade_vendas: "Nº de Vendas",
    total_vendas: "Total Vendido (R$)",
    letra_ausente: "Letra Ausente",
  };

  useEffect(() => {
    const list = structuredClone(data);
    if (list && list.length) {
      list.forEach((client: any) => {
        delete client.vendas;
      });
      setList(list);
    }
  }, [data]);

  return (
    <div style={{ overflowX: "auto", marginTop: "2rem" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f7f7f7",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            {newList.length > 0 &&
              Object.keys(newList[0]).map((k, index) => (
                <th
                  key={index}
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "left",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formattedKeys[k as keyof typeof formattedKeys] || k}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {newList.map((client, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
              }}
            >
              {Object.keys(client).map((k, ind) => (
                <td
                  key={ind}
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #eee",
                    whiteSpace: "nowrap",
                  }}
                >
                  {client[k]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
