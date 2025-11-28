import { Task } from '../models/Task.js'

export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await Task.getStatistics()
    res.json({ success: true, data: stats })
  } catch (error) {
    next(error)
  }
}
