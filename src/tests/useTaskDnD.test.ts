import { renderHook } from '@testing-library/react'
import { useTaskDnD } from '../hooks/useTaskDnD'
import { arrayMove } from '@dnd-kit/sortable'
import { TaskDTO } from '../types/task'


jest.mock('@dnd-kit/sortable', () => ({
  arrayMove: jest.fn((arr, oldIndex, newIndex) => {
    const newArr = [...arr]
    const [moved] = newArr.splice(oldIndex, 1)
    newArr.splice(newIndex, 0, moved)
    return newArr
  }),
}))

describe('useTaskDnD', () => {
  const tasks: TaskDTO[] = [
    { id: 1, title: 'Tarefa 1', completed: false, createdAt: new Date().toISOString() },
    { id: 2, title: 'Tarefa 2', completed: false, createdAt: new Date().toISOString() },
    { id: 3, title: 'Tarefa 3', completed: false, createdAt: new Date().toISOString() },
  ]

  it('deve retornar sensors', () => {
    const { result } = renderHook(() =>
      useTaskDnD({ tasks, setTasks: jest.fn(), saveOrder: jest.fn() })
    )
    expect(result.current.sensors.length).toBeGreaterThan(0)
  })

  it('não deve alterar tarefas se over for null', () => {
    const setTasks = jest.fn()
    const { result } = renderHook(() => useTaskDnD({ tasks, setTasks, saveOrder: jest.fn() }))

    result.current.handleDragEnd({ active: { id: 1 }, over: null } as any)
    expect(setTasks).not.toHaveBeenCalled()
  })

  it('não deve alterar tarefas se active.id === over.id', () => {
    const setTasks = jest.fn()
    const { result } = renderHook(() => useTaskDnD({ tasks, setTasks, saveOrder: jest.fn() }))

    result.current.handleDragEnd({ active: { id: 1 }, over: { id: 1 } } as any)
    expect(setTasks).not.toHaveBeenCalled()
  })

  it('deve reordenar tarefas e chamar saveOrder', () => {
    const setTasks = jest.fn((fn) => fn(tasks))
    const saveOrder = jest.fn()
    const { result } = renderHook(() => useTaskDnD({ tasks, setTasks, saveOrder }))

    result.current.handleDragEnd({ active: { id: 1 }, over: { id: 3 } } as any)

    expect(setTasks).toHaveBeenCalled()
    expect(saveOrder).toHaveBeenCalledWith([2, 3, 1])
  })
})
