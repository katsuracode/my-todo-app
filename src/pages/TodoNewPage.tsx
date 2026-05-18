import { useNavigate } from 'react-router-dom'
import { useTodos } from '../context/TodoContext'
import './TodoNewPage.css'
import type { Todo } from '../types/todo'
import TodoForm from '../components/todos/TodoForm'

const TodoNewPage = () => {
  const { addTodo } = useTodos()
  const navigate = useNavigate()

  const initialValues: Omit<Todo, 'id' | 'completed'> = {
    title: '',
    detail: '',
    dueDate: new Date(),
    priority: 'medium',
  }

  const handleSubmit = (values: Omit<Todo, 'id' | 'completed'>) => {
    addTodo(values)

    navigate('/todos', { state: { message: '登録しました' } })
  }

  return (
    <div className='todo-new-page'>
      <h2 className='page-title'>新規Todo作成</h2>
      <TodoForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitText='登録'
      />
    </div>
  )
}

export default TodoNewPage
