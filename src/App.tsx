import React from 'react'
import { Provider } from 'react-redux'
import Router from './routes/Router'
import { store } from './store/store'

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
