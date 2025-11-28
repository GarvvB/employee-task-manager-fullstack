import { Task } from '../models/Task.js'
import { validateTask } from '../utils/validation.js'

export const getAllTasks = async (req, res, next) => {
  try {
    const { status } = req.query
    const tasks = await Task.findAll(status)
    res.json({ success: true, data: tasks })
  } catch (error) {
    next(error)
  }
}

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' })
    }
    res.json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

export const createTask = async (req, res, next) => {
  try {
    const validation = validateTask(req.body)
    if (!validation.valid) {
      return res.status(400).json({ success: false, errors: validation.errors })
    }

    const task = await Task.create(req.body)
    res.status(201).json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

export const updateTask = async (req, res, next) => {
  try {
    const validation = validateTask(req.body)
    if (!validation.valid) {
      return res.status(400).json({ success: false, errors: validation.errors })
    }

    const task = await Task.update(req.params.id, req.body)
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' })
    }
    res.json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.delete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Task not found' })
    }
    res.json({ success: true, message: 'Task deleted successfully' })
  } catch (error) {
    next(error)
  }
}
