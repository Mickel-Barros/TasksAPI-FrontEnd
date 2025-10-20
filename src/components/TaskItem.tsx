import React from 'react'
import { TaskDTO } from '../types/task'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface TaskItemProps {
  task: TaskDTO
  onDelete: (id: number) => void
  onToggle: (id: number, completed: boolean) => void
}

export default function TaskItem({ task, onDelete, onToggle }: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const baseButton = "w-10 h-10 flex items-center justify-center rounded-md transition"

  return (
    <article ref={setNodeRef} style={style} className="card p-4 flex items-center justify-between">
      <div className="flex items-start gap-4">
        <div {...attributes} {...listeners} className="text-slate-400 cursor-grab pt-1">⋮⋮</div>

        <div>
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          {task.description && <p className="text-sm text-slate-500 mt-1">{task.description}</p>}
          <div className="text-xs text-slate-400 mt-3">
            Criada em: {new Date(task.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(task.id, !task.completed)}
          className={`${baseButton} ${
            task.completed
              ? 'bg-white border-2 border-gray-500 text-gray-500'
              : 'bg-slate-900 text-white'
          }`}
          aria-label={task.completed ? 'Marcar como não concluída' : 'Marcar como concluída'}
          title={task.completed ? 'Marcar como não concluída' : 'Marcar como concluída'}
        >
          {task.completed ? 'X' : '✓'}
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className={`${baseButton} bg-red-500 text-white`}
          aria-label="Excluir tarefa"
          title="Excluir tarefa"
        >
          🗑
        </button>
      </div>
    </article>
  )
}
