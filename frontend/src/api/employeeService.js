import api from './axios'

export const employeeService = {
  getAll: async () => {
    const response = await api.get('/employees')
    return response.data.data
  },

  getById: async (id) => {
    const response = await api.get(`/employees/${id}`)
    return response.data.data
  },

  create: async (employee) => {
    const response = await api.post('/employees', employee)
    return response.data.data
  },

  update: async (id, employee) => {
    const response = await api.put(`/employees/${id}`, employee)
    return response.data.data
  },

  delete: async (id) => {
    const response = await api.delete(`/employees/${id}`)
    return response.data
  },
}
