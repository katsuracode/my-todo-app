import { useNavigate, useParams } from 'react-router-dom'
import './TodoEditPage.css'
import type { Todo } from '../types/todo'
import TodoForm from '../components/todos/TodoForm'
import { useTodos } from '../context/TodoContext'

const TodoEditPage = () => {
  const { id } = useParams()
  const { getTodo, updateTodo } = useTodos()
  const navigate = useNavigate()

  const todo = getTodo(id)

  if (!todo) {
    return (
      <div className='todo-edit-page'>
        <h2 className='page-title'>エラー</h2>
        <p className='error-message'>指定されたTodoが見つかりませんでした。</p>
        <button
          type='button'
          className='btn-primary'
          onClick={() => navigate('/todos')}
        >
          一覧へ戻る
        </button>
      </div>
    )
  }

  const initialValues: Todo = {
    title: todo.title || '',
    detail: todo.detail || '',
    dueDate: todo.dueDate || new Date(),
    priority: todo.priority || 'medium',
  }

  const handleSubmit = (values) => {
    updateTodo(id, values)

    navigate('/todos', { state: { message: '更新しました' } })
  }

  return (
    <div className='todo-edit-page'>
      <h2 className='page-title'>Todo編集</h2>
      <TodoForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitText='更新'
      />
    </div>
  )
}

export default TodoEditPage
