import React from 'react'
import { TaskDTO } from '../api'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function TaskItem({ task, onDelete, onToggle }:{ task: TaskDTO, onDelete:(id:number)=>void, onToggle:(id:number, completed:boolean)=>void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} className="card p-4 flex items-center justify-between">
      <div className="flex items-start gap-4">
        <div {...attributes} {...listeners} className="text-slate-400 cursor-grab pt-1">⋮⋮</div>
        <div>
          {/* Adiciona 'line-through' quando a tarefa está concluída */}
          <div className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </div>
          {task.description && <div className="text-sm text-slate-500 mt-1">{task.description}</div>}
          <div className="text-xs text-slate-400 mt-3">Criada em: {new Date(task.createdAt).toLocaleDateString()}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Botão de Toggle (Check ou X) */}
        <button 
          onClick={() => onToggle(task.id, !task.completed)} 
          className={`w-10 h-10 flex items-center justify-center rounded-md ${task.completed ? 'bg-white border-2 border-gery-500 text-grey-500' : 'bg-[rgb(15_23_42)] text-white'}`}
        >
          {/* Se estiver concluída, exibe um "X", senão, exibe um "✓" */}
          {task.completed ? 'X' : '✓'}
        </button>

        {/* Botão de Delete */}
        <button onClick={() => onDelete(task.id)} className="w-10 h-10 flex items-center justify-center rounded-md bg-red-500 text-white">
          🗑
        </button>
      </div>
    </div>
  )
}

