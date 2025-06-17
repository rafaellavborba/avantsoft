import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './styles/DashboardPage.module.scss'
import { fetchClients } from '../store/actions/clients'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../store/hooks'
import CardSection from '../components/sections/CardSection'
import ChartSection from '../components/sections/ChartSection'
import LoadingPage from '../components/loaders/LoadingPage'
import ClientsSections from '../components/sections/ClientsSection'
export default function DashboardPage() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { S_CLIENTS } = useAppSelector((state) => state.clients) as { S_CLIENTS: any[] }

  const [loadingPage, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])

  useEffect(() => {
    if(!S_CLIENTS){
      dispatch(fetchClients())
      return
    }
    setLoading(false)
  },[S_CLIENTS])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  const handleAddClient = () => {
    navigate('/novo')
  }
  return (
    <div className={styles.dashboardPage}>
      <div className={`${styles.contentcontainer} container`}>
        <header className={styles.header}>
          <h1 className={styles.title}>Dashboard de Vendas</h1>
          <div className={styles.buttonsContent}>
            <button aria-label='Adicionar Cliente' className={styles.addClient} onClick={handleAddClient}>+ Cliente</button>
            <button aria-label='Sair' className={styles.logoutButton} onClick={handleLogout}>Sair</button>
          </div>
        </header>

        <main className={styles.content}>
          {S_CLIENTS && S_CLIENTS.length && !loadingPage ? 
            <>
              <CardSection data={S_CLIENTS}/>
              <ChartSection data={S_CLIENTS} />
              <ClientsSections data={S_CLIENTS} />
            </> 
            : <LoadingPage />
          }
        </main>
      </div>
    </div>
  )
}
