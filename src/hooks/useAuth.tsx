import {useContext, createContext} from 'react';

type AuthContextType = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}
export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}