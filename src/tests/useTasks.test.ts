import { renderHook, act, waitFor } from '@testing-library/react'
import { useTasks } from '../hooks/useTask'
import * as api from '../api'
import { TaskDTO } from '../types/task'


jest.mock('../api', () => ({
  getTasks: jest.fn(),
  deleteTask: jest.fn(),
  toggleComplete: jest.fn(),
}))

describe('useTasks hook', () => {
  const mockTasks: TaskDTO[] = [
    { id: 1, title: 'Tarefa 1', completed: false, createdAt: new Date().toISOString() },
    { id: 2, title: 'Tarefa 2', completed: true, createdAt: new Date().toISOString() },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    ;(api.getTasks as jest.Mock).mockResolvedValue({ data: mockTasks })
    ;(api.deleteTask as jest.Mock).mockResolvedValue({})
    ;(api.toggleComplete as jest.Mock).mockResolvedValue({})
  })

  it('deve carregar tarefas', async () => {
    const { result } = renderHook(() => useTasks())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.tasks).toHaveLength(2)
  })

  it('deve deletar tarefa', async () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true)
    const { result } = renderHook(() => useTasks())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.onDelete(1)
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].id).toBe(2)
  })

  it('deve alternar completed', async () => {
    const { result } = renderHook(() => useTasks())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.onToggle(1, true)
    })

    expect(result.current.tasks.find(t => t.id === 1)?.completed).toBe(true)
  })
})
