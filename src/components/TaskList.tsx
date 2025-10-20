import React from 'react'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskItem from './TaskItem'
import { useTasks } from '../hooks/useTask'
import { useTaskDnD } from '../hooks/useTaskDnD'

export default function TaskList() {
  const { tasks, loading, error, onDelete, onToggle, setTasks, saveOrder } = useTasks()
  const { sensors, handleDragEnd } = useTaskDnD({ tasks, setTasks, saveOrder })

  if (loading) return <div className="text-slate-500">Carregando tarefas...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <ul className="space-y-4">
          {tasks.map(t => (
            <li key={t.id}>
              <TaskItem task={t} onDelete={onDelete} onToggle={onToggle} />
            </li>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}

