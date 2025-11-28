import api from './axios'

export const taskService = {
  getAll: async (status = null) => {
    const url = status ? `/tasks?status=${status}` : '/tasks'
    const response = await api.get(url)
    return response.data.data
  },

  getById: async (id) => {
    const response = await api.get(`/tasks/${id}`)
    return response.data.data
  },

  create: async (task) => {
    const response = await api.post('/tasks', task)
    return response.data.data
  },

  update: async (id, task) => {
    const response = await api.put(`/tasks/${id}`, task)
    return response.data.data
  },

  delete: async (id) => {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
  },
}
