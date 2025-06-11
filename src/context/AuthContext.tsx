import { useState, type ReactNode } from 'react'
import { AuthContext } from '../hooks/useAuth'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const defaultCredentials = {
    user: 'admin',
    password: 'admin',
  }

  const login = (user: string, password: string) => {
    if (user === defaultCredentials.user && password === defaultCredentials.password) {
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => setIsAuthenticated(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
