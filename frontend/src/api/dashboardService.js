import api from './axios'

export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard')
    return response.data.data
  },
}
