import { createAsyncThunk } from '@reduxjs/toolkit'
import { A_CLIENTS } from '../slices/clientSlice';
import formattedDate from '../../utils/formattedDate';
import firstLetter from '../../utils/firstLetter';

type Cliente = {
  nomeCompleto: string;
  email: string;
  nascimento: string;
  vendas: { data: string; valor: number }[];
};

export const fetchClients = createAsyncThunk<Cliente[]>(
  'fetchClients',
  async (_, { dispatch }) => {
    try {
      const clientes = await new Promise<Cliente[]>((resolve) => {
        setTimeout(() => {
          const raw = {
            data: {
              clientes: [
                {
                  info: {
                    nomeCompleto: "Ana Beatriz",
                    detalhes: {
                      email: "ana.b@example.com",
                      nascimento: "1992-05-01",
                    },
                  },
                  estatisticas: {
                    vendas: [
                      { data: "2024-01-01", valor: 150 },
                      { data: "2024-01-02", valor: 50 },
                    ],
                  },
                },
                {
                  info: {
                    nomeCompleto: "Carlos Eduardo",
                    detalhes: {
                      email: "cadu@example.com",
                      nascimento: "1987-08-15",
                    },
                  },
                  duplicado: {
                    nomeCompleto: "Carlos Eduardo",
                  },
                  estatisticas: {
                    vendas: [],
                  },
                },
              ],
            },
          };
          
          
          const clientes = raw.data.clientes.map((c) => ({
            nomeCompleto: c.info?.nomeCompleto ?? c.duplicado?.nomeCompleto ?? "Sem nome",
            email: c.info?.detalhes?.email ?? "",
            nascimento: formattedDate(c.info?.detalhes?.nascimento) ?? "",
            vendas: c.estatisticas?.vendas ?? [],
            total_vendas: c.estatisticas?.vendas?.reduce((acc, v) => acc + v.valor, 0) || 0,
            quantidade_vendas: c.estatisticas?.vendas?.length || 0,
            letra_ausente: firstLetter(c.info.nomeCompleto),
          }));

          resolve(clientes);
        }, 1000);
      });

      dispatch(A_CLIENTS(clientes))
    } catch (error) {
      console.error('Erro ao buscar clientes: ', error);
      throw error; 
    }
  }
);

export const postClient = createAsyncThunk<Cliente[], Cliente>(
  'postClient',
  async (client, { dispatch, getState }) => {
    try {
      const state = getState() as { clients: { S_CLIENTS: Cliente[] } };
      const S_CLIENTS = state.clients.S_CLIENTS || [];
      const newClients = structuredClone(S_CLIENTS);
      newClients.push(client);
      dispatch(A_CLIENTS(newClients));
      return newClients;
    } catch (error) {
      console.log('Erro ao adicionar cliente');
      throw error;
    }
  }
)