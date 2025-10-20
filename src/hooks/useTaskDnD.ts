import { useCallback } from 'react'
import { DndContextProps, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { TaskDTO } from '../types/task'

interface UseTaskDnDProps {
  tasks: TaskDTO[]
  setTasks: React.Dispatch<React.SetStateAction<TaskDTO[]>>
  saveOrder: (order: number[]) => void
}

export function useTaskDnD({ tasks, setTasks, saveOrder }: UseTaskDnDProps) {
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setTasks(prev => {
      const oldIndex = prev.findIndex(i => i.id === active.id)
      const newIndex = prev.findIndex(i => i.id === over.id)
      const newArr = arrayMove(prev, oldIndex, newIndex)
      saveOrder(newArr.map(t => t.id))
      return newArr
    })
  }, [saveOrder])

  return { sensors, handleDragEnd }
}
