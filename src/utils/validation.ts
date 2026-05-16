import type { ValidationError } from '../types/error'
import type { Input } from '../types/input'

const validateTodo = (input: Input) => {
  const errors: ValidationError = {}

  if (!input.title.trim()) {
    errors.title = 'タイトルは必須です'
  }

  if (input.title && input.title.length > 10) {
    errors.detail = 'タイトルは10文字まで'
  }

  if (input.detail && input.detail.length > 50) {
    errors.detail = '詳細は50文字まで'
  }

  if (input.dueDate) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const d = new Date(input.dueDate)

    if (d < today) {
      errors.dueDate = '今日以降の日付を指定してください'
    }
  }

  if (!['low', 'medium', 'high'].includes(input.priority)) {
    errors.priority = '優先度を選択してください'
  }

  return errors
}

export { validateTodo }
