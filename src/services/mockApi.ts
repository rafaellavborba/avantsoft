// Tipagens
interface Venda {
  data: string;
  valor: number;
}

interface Cliente {
  nomeCompleto: string;
  email: string;
  nascimento: string;
  vendas: Venda[];
}

export async function fetchClientes(): Promise<Cliente[]> {
  return new Promise((resolve) => {
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
        meta: {
          registroTotal: 2,
          pagina: 1,
        },
        redundante: {
          status: "ok",
        },
      };

      const clientes: Cliente[] = raw.data.clientes.map((c) => {
        return {
          nomeCompleto: c.info?.nomeCompleto ?? c.duplicado?.nomeCompleto ?? "Sem nome",
          email: c.info?.detalhes?.email ?? "",
          nascimento: c.info?.detalhes?.nascimento ?? "",
          vendas: c.estatisticas?.vendas ?? [],
        };
      });

      resolve(clientes);
    }, 1000); 
  });
}
