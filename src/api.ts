import axios from 'axios'
import { TaskDTO } from './types/task'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  timeout: 5000
})

export const getTasks = () => api.get<TaskDTO[]>('/tasks')
export const createTask = (payload: { title: string; description?: string }) => api.post<TaskDTO>('/tasks', payload)
export const deleteTask = (id: number) => api.delete(`/tasks/${id}`)
export const toggleComplete = (id: number, completed: boolean) => api.patch(`/tasks/${id}`, { completed })
export default api
