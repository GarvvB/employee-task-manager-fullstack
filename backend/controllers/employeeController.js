import { Employee } from '../models/Employee.js'
import { validateEmployee } from '../utils/validation.js'

export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll()
    res.json({ success: true, data: employees })
  } catch (error) {
    next(error)
  }
}

export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id)
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' })
    }
    res.json({ success: true, data: employee })
  } catch (error) {
    next(error)
  }
}

export const createEmployee = async (req, res, next) => {
  try {
    const validation = validateEmployee(req.body)
    if (!validation.valid) {
      return res.status(400).json({ success: false, errors: validation.errors })
    }

    const employee = await Employee.create(req.body)
    res.status(201).json({ success: true, data: employee })
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ success: false, message: 'Email already exists' })
    }
    next(error)
  }
}

export const updateEmployee = async (req, res, next) => {
  try {
    const validation = validateEmployee(req.body)
    if (!validation.valid) {
      return res.status(400).json({ success: false, errors: validation.errors })
    }

    const employee = await Employee.update(req.params.id, req.body)
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' })
    }
    res.json({ success: true, data: employee })
  } catch (error) {
    next(error)
  }
}

export const deleteEmployee = async (req, res, next) => {
  try {
    const deleted = await Employee.delete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Employee not found' })
    }
    res.json({ success: true, message: 'Employee deleted successfully' })
  } catch (error) {
    next(error)
  }
}
