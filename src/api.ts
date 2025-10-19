import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 5000
})

export type TaskDTO = {
  id: number
  title: string
  description?: string
  completed: boolean
  createdAt: string
}

export const getTasks = () => api.get<TaskDTO[]>('/tasks')

export default api
