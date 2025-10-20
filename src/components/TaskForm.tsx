import React from 'react'
import { useTaskForm } from '../hooks/useTaskForm'

export default function TaskForm() {
  const {
    title,
    description,
    setTitle,
    setDescription,
    loading,
    error,
    handleSubmit,
  } = useTaskForm()

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Título
        </label>
        <input
          id="title"
          required
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-slate-500 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título da tarefa"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Descrição
        </label>
        <textarea
          id="description"
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-slate-500 focus:outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Digite a descrição (opcional)"
        />
      </div>

      {error && (
        <div className="p-2 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
          {error}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className={`w-full py-3 rounded-md transition ${
            loading || !title.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {loading ? 'Criando...' : 'Criar Tarefa'}
        </button>
      </div>
    </form>
  )
}
