import { useState } from 'react'
import { createTask } from '../api'

export function useCreateTask() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreateTask(payload: { title: string; description?: string }) {
    setLoading(true)
    setError(null)
    try {
      await createTask(payload)
      window.dispatchEvent(new CustomEvent('todo:created'))
    } catch (err) {
      setError('Falha ao criar a tarefa')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { handleCreateTask, loading, error }
}
