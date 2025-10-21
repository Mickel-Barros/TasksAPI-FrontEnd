import React, { useState } from 'react'
import { useTaskForm } from '../hooks/useTaskForm'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

  const [descriptionError, setDescriptionError] = useState(false)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description && description.length < 5) {
      setDescriptionError(true)
      toast.error('A descrição precisa ter pelo menos 5 caracteres.') 
      return
    }

    setDescriptionError(false) 
    handleSubmit(e) 

    toast.success('Tarefa criada com sucesso!') 
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
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
        {descriptionError && (
          <div className="text-sm text-red-600 mt-1">
            A descrição precisa ter pelo menos 5 caracteres.
          </div>
        )}
      </div>

      {error && (
        <div className="p-2 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
          {error}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading || !title.trim() || descriptionError}
          className={`w-full py-3 rounded-md transition ${
            loading || !title.trim() || descriptionError
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
