import type { Todo } from '../../types/todo'
import TodoItem from './TodoItem'
import './TodoList.css'

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className='empty-state'>
        <p className='empty-message'>Todoがありません</p>
        <p className='empty-sub'>新規ボタンから追加してください</p>
      </div>
    )
  }
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList
