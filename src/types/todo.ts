import type { Priority } from './priority'

export type Todo = {
  id: string
  title: string
  detail: string
  priority: Priority
  completed: boolean
  dueDate: Date
}
