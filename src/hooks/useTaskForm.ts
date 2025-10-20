import { useState, useCallback } from 'react'
import { createTask } from '../api'
import { CreateTaskPayload } from '../types/task'

export function useTaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetForm = useCallback(() => {
    setTitle('')
    setDescription('')
    setError(null)
  }, [])

  const validate = useCallback((): boolean => {
    if (!title.trim()) {
      setError('Título é obrigatório')
      return false
    }
    return true
  }, [title])

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setError(null)

    if (!validate()) return

    const payload: CreateTaskPayload = {
      title: title.trim(),
      description: description.trim() || undefined,
    }

    setLoading(true)
    try {
      if (import.meta.env.MODE === 'development') {
        console.log('[DEBUG] Enviando tarefa:', payload)
      }

      await createTask(payload)
      resetForm()
      window.dispatchEvent(new CustomEvent('todo:created'))
    } catch (err) {
      console.error('[ERRO] Falha ao criar tarefa:', err)
      setError('Falha ao criar a tarefa')
    } finally {
      setLoading(false)
    }
  }, [title, description, validate, resetForm])

  return {
    title,
    description,
    setTitle,
    setDescription,
    loading,
    error,
    handleSubmit,
  }
}
