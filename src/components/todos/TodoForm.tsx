import { useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ValidationError } from '../../types/error'
import type { Todo } from '../../types/todo'
import { validateTodo } from '../../utils/validation'
import './TodoForm.css'

type TodoFormProps = {
  initialValues: Omit<Todo, 'id' | 'completed'>
  onSubmit: (values: Omit<Todo, 'id' | 'completed'>) => void
  submitText: string
}

const TodoForm = ({
  initialValues,
  onSubmit,
  submitText = '保存',
}: TodoFormProps) => {
  const [values, setValues] = useState<Omit<Todo, 'id' | 'completed'> | Todo>(
    initialValues as Omit<Todo, 'id' | 'completed'>,
  )

  const [errors, setErrors] = useState<ValidationError>({})
  const navigate = useNavigate()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.currentTarget
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = validateTodo(values)
    setErrors(errors)

    if (Object.keys(errors).length === 0) {
      onSubmit(values)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      <div className='form-group'>
        <label htmlFor='title' className='form-label'>
          タイトル <span className='required'>*</span>
        </label>
        <input
          type='text'
          name='title'
          id='title'
          value={values.title}
          onChange={handleChange}
          className={errors.title ? 'form-input error' : 'form-input'}
          maxLength={10}
        />
        {errors.title && <span className='error-text'>{errors.title}</span>}
      </div>
      <div className='form-group'>
        <label htmlFor='detail' className='form-label'>
          詳細
        </label>
        <textarea
          name='detail'
          id='detail'
          value={values.detail}
          onChange={handleChange}
          className={errors.detail ? 'form-input error' : 'form-input'}
          rows={3}
          maxLength={50}
        />
        {errors.detail && <span className='error-text'>{errors.detail}</span>}
      </div>
      <div className='form-group'>
        <label htmlFor='dueDate' className='form-label'>
          期日
        </label>
        <input
          type='date'
          name='dueDate'
          id='dueDate'
          value={
            values.dueDate instanceof Date
              ? values.dueDate.toISOString().split('T')[0]
              : values.dueDate
          }
          onChange={handleChange}
          className={errors.dueDate ? 'form-input error' : 'form-input'}
          maxLength={10}
        />
        {errors.dueDate && <span className='error-text'>{errors.dueDate}</span>}
      </div>
      <div className='form-group'>
        <label htmlFor='priority' className='form-label'>
          優先度 <span className='required'>*</span>
        </label>
        <select
          name='priority'
          id='priority'
          value={values.priority}
          onChange={handleChange}
          className={errors.priority ? 'form-input error' : 'form-input'}
        >
          <option value=''>選択してください</option>
          <option value='low'>低</option>
          <option value='medium'>中</option>
          <option value='high'>高</option>
        </select>
        {errors.priority && (
          <span className='error-text'>{errors.priority}</span>
        )}
      </div>
      <div className='form-actions'>
        <button type='submit' className='btn-primary'>
          {submitText}
        </button>
        <button
          type='button'
          className='btn-secondary'
          onClick={() => navigate(-1)}
        >
          キャンセル
        </button>
      </div>
    </form>
  )
}

export default TodoForm
