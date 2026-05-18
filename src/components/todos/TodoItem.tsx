import { Link } from 'react-router-dom'
import type { Priority } from '../../types/priority'
import type { Todo } from '../../types/todo'
import './TodoItem.css'

const priorityColors: Record<Priority, string> = {
  low: 'priority-low',
  medium: 'priority-medium',
  high: 'priority-high',
}

const priorityLabels: Record<Priority, string> = {
  low: '低',
  medium: '中',
  high: '高',
}

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className='todo-item-content'>
        <input
          type='checkbox'
          name='completed'
          id='completed'
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className='todo-checkbox'
        />

        <div className='todo-details'>
          <span
            className={todo.completed ? 'todo-title completed' : 'todo-title'}
          >
            {todo.title}
          </span>
          <div className='todo-meta'>
            <span className={`priority-badge ${priorityColors[todo.priority]}`}>
              {priorityLabels[todo.priority]}
            </span>
            {todo.dueDate && (
              <span className='due-date'>
                期日：{todo.dueDate.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className='todo-actions'>
        <Link
          to={`/todos/${todo.id}/edit`}
          className='action-btn edit-btn'
          title='編集'
        >
          🖊️
        </Link>
        <button
          onClick={() => onDelete(todo.id)}
          className='action-btn delete-btn'
          title='削除'
        >
          🗑️
        </button>
      </div>
    </li>
  )
}

export default TodoItem
