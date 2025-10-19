import React, { useState } from 'react'
import { createTask } from '../api'

export default function TaskForm(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if(!title.trim()){ setError('Título é obrigatório'); return }
    setLoading(true)
    try{
      await createTask({ title: title.trim(), description: description.trim() || undefined })
      setTitle(''); setDescription('')
      window.dispatchEvent(new CustomEvent('todo:created'))
    }catch(err){
      setError('Falha ao criar a tarefa')
    }finally{ setLoading(false) }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <input className="w-full border rounded-md px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Digite o título da tarefa" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <textarea className="w-full border rounded-md px-3 py-2" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Digite a descrição da tarefa (opcional)" />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div>
        <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-md" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Tarefa'}
        </button>
      </div>
    </form>
  )
}
