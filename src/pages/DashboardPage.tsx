import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './styles/DashboardPage.module.scss'

export default function DashboardPage() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
    
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className={styles.dashboardPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard de Vendas</h1>
        <button onClick={handleLogout}>Sair</button>
      </header>

      <main className={styles.content}>
        {/* Aqui você pode inserir cards, gráficos, tabelas etc. */}
        <section className={styles.cardSection}>
          <div className={styles.card}>Total de vendas: R$ 12.340,00</div>
          <div className={styles.card}>Pedidos em aberto: 7</div>
          <div className={styles.card}>Clientes ativos: 124</div>
        </section>
      </main>
    </div>
  )
}
