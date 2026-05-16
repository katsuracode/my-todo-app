import './ConfirmDialog.css'

type ConfirmDialogProps = {
  open: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  if (!open) return null

  return (
    <>
      <div className='dialog-overlay' onClick={onCancel}>
        <div className='dialog-container'>
          <div className='dialog-header'>
            <h2 className='dialog-title'>{title}</h2>
          </div>
          <div className='dialog-content'>
            <p className='dialog-message'>{message}</p>
          </div>
          <div className='dialog-actions'>
            <button className='btn-secondary' onClick={onCancel}>
              キャンセル
            </button>
            <button className='btn-danger' onClick={onConfirm}>
              削除
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmDialog
