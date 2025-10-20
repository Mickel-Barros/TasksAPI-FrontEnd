import { useState, useEffect, useCallback } from 'react'
import { getTasks, deleteTask, toggleComplete } from '../api'
import { TaskDTO } from '../types/task'

export function useTasks() {
  const [tasks, setTasks] = useState<TaskDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const saveOrder = useCallback((order: number[]) => {
    try {
      localStorage.setItem('todo_order', JSON.stringify(order))
    } catch {
      console.warn('Falha ao salvar ordem')
    }
  }, [])

  const loadTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getTasks()
      let data = res.data
      const order = JSON.parse(localStorage.getItem('todo_order') || '[]') as number[]

      if (order?.length) {
        data = data.slice().sort((a, b) => {
          const ia = order.indexOf(a.id)
          const ib = order.indexOf(b.id)
          if (ia === -1 && ib === -1) return 0
          if (ia === -1) return 1
          if (ib === -1) return -1
          return ia - ib
        })
      }

      setTasks(data)
    } catch (e: any) {
      console.error('[ERRO]', e)
      setError(e?.message || 'Erro ao carregar tarefas')
    } finally {
      setLoading(false)
    }
  }, [])

  const onDelete = useCallback(async (id: number) => {
    if (!confirm('Deletar tarefa?')) return
    await deleteTask(id)
    setTasks(prev => {
      const updated = prev.filter(t => t.id !== id)
      saveOrder(updated.map(t => t.id))
      return updated
    })
  }, [saveOrder])

  const onToggle = useCallback(async (id: number, completed: boolean) => {
    try {
      await toggleComplete(id, completed)
      setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed } : t)))
    } catch (error) {
      console.error('[ERRO] Falha ao atualizar status da tarefa:', error)
    }
  }, [])

  useEffect(() => {
    loadTasks()
    const handler = () => loadTasks()
    window.addEventListener('todo:created', handler)
    return () => window.removeEventListener('todo:created', handler)
  }, [loadTasks])

  return { tasks, loading, error, onDelete, onToggle, setTasks, saveOrder }
}
