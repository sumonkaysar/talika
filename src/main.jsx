import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './contexts/AuthProvider.jsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </AuthProvider>
  </React.StrictMode>,
)
