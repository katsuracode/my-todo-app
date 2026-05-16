import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './components/layout/AppLayout'
import { TodoProvider } from './context/TodoContext'
import TodoEditPage from './pages/TodoEditPage'
import TodoNewPage from './pages/TodoNewPage'
import TodoPages from './pages/TodoPages'

const App = () => {
  return (
    <TodoProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path='/' element={<Navigate to='/todos' replace />} />
            <Route path='/todos' element={<TodoPages />} />
            <Route path='/todos/new' element={<TodoNewPage />} />
            <Route path='/todos/:id/edit' element={<TodoEditPage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TodoProvider>
  )
}

export default App
