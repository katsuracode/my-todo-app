import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ConfirmDialog from '../components/common/ConfirmDialog'
import TodoList from '../components/todos/TodoList'
import { useTodos } from '../context/TodoContext'
import { type Todo } from '../types/todo'
import './TodosPage.css'

const TodoPages = () => {
  const { todos, toggleTodoCompleted, removeTodo } = useTodos()
  const [deleteTarget, setDeleteTarget] = useState<Todo | null>(null)
  const [successMessage, setSuccessMessage] = useState('')

  const location = useLocation()

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message)

      window.history.replaceState({}, '', location.pathname)
    }
  }, [location.state, location.pathname])

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [successMessage])

  const handleDeleteClick = (id: string) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) setDeleteTarget(todo)
    else throw new Error(`Cant' find todo`)
  }

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      removeTodo(deleteTarget.id)

      setDeleteTarget(null)
      setSuccessMessage('削除しました')
    }
  }

  const handleDeleteCancel = () => {
    setDeleteTarget(null)
  }

  return (
    <div className='todos-page'>
      <h2 className='page-title'>Todo一覧</h2>

      {successMessage && (
        <div className='success-message'>
          <span>{successMessage}</span>
          <button
            type='button'
            className='message-close-btn'
            onClick={() => setSuccessMessage('')}
          ></button>
        </div>
      )}

      <TodoList
        todos={todos}
        onToggle={toggleTodoCompleted}
        onDelete={handleDeleteClick}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title='削除の確認'
        message={`「${deleteTarget?.title}」を削除してもよろしいでしょうか？`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  )
}

export default TodoPages
