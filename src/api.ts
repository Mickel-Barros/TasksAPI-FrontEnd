import axios, { AxiosError } from 'axios'
import { TaskDTO } from './types/task'


const sanitize = (text?: string) =>
  typeof text === 'string' ? text.replace(/<[^>]*>?/gm, '').trim() : text


const baseURL =
  import.meta.env.VITE_API_URL?.trim() ||
  process.env.REACT_APP_API_URL?.trim() ||
  'http://localhost:4000'

const api = axios.create({
  baseURL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false 
})


api.interceptors.request.use((config) => {
  if (config.data && typeof config.data === 'object') {
    const sanitized: Record<string, any> = {}
    for (const key in config.data) {
      sanitized[key] = sanitize(config.data[key])
    }
    config.data = sanitized
  }

  const meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null
  if (meta?.content) {
    config.headers['X-CSRF-Token'] = meta.content
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status
      let message = 'Erro inesperado. Tente novamente mais tarde.'

      if (status >= 400 && status < 500) message = 'Verifique os dados e tente novamente.'
      if (status >= 500) message = 'O servidor encontrou um problema. Tente mais tarde.'

      console.error(`API error (${status}):`, error.response.data)
      return Promise.reject({ status, message, details: error.response.data })
    }

    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ message: 'Tempo limite excedido. Verifique sua conexão.' })
    }

    return Promise.reject({ message: 'Falha de conexão com o servidor.' })
  }
)

export const getTasks = () => api.get<TaskDTO[]>('/tasks')

export const createTask = (payload: { title: string; description?: string }) =>
  api.post<TaskDTO>('/tasks', {
    title: sanitize(payload.title),
    description: sanitize(payload.description)
  })

export const deleteTask = (id: number) => api.delete(`/tasks/${id}`)

export const toggleComplete = (id: number, completed: boolean) =>
  api.patch(`/tasks/${id}`, { completed })

export default api
