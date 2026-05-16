import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import type { Todo } from '../types/todo'

type TodoContextType = {
  todos: Todo[]
  addTodo: (todo: Todo) => void
  updateTodo: (id: string, values: Todo) => void
  removeTodo: (id: string) => void
  toggleTodoCompleted: (id: string) => void
  getTodo: (id: string) => Todo
}

const STORAGE_KEY = 'app.todos'
const TodoContext = createContext<TodoContextType | null>(null)

const TodoProvider = ({ children }: React.PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch (e) {
      console.error('ローカルストレージへの保存が失敗しました')
    }
  }, [todos])

  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => {
      const todoWithId = {
        ...newTodo,
        id: `t_${Date.now()}`,
        completed: false,
      }

      return [todoWithId, ...prevTodos]
    })
  }

  const updateTodo = (id: string, patch: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...patch } : todo)),
    )
  }

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  const toggleTodoCompleted = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const getTodo = (id: string) => {
    return todos.find((todo) => todo.id === id)
  }

  const value = {
    todos,
    addTodo,
    updateTodo,
    removeTodo,
    toggleTodoCompleted,
    getTodo,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

const useTodos = () => {
  const context = useContext(TodoContext)
  if (!context) throw new Error('useTodosはTodoProviderの内側で使ってください')

  return context
}

export { useTodos, TodoProvider }
