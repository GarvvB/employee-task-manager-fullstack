import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { taskService } from '../api/taskService'
import { employeeService } from '../api/employeeService'
import { motion } from 'framer-motion'

const TaskForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [employees, setEmployees] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    status: 'Pending',
    due_date: '',
    employee_id: ''
  })
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEmployees()
  }, [])

  useEffect(() => {
    if (isEdit && employees.length > 0) {
      fetchTask()
    } else if (!isEdit && employees.length > 0) {
      setInitialLoading(false)
    }
  }, [id, employees])

  const fetchEmployees = async () => {
    try {
      const data = await employeeService.getAll()
      setEmployees(data)
      // Set default employee_id when creating new task
      if (!isEdit && data.length > 0) {
        setFormData(prev => ({ ...prev, employee_id: data[0].id }))
      }
    } catch (error) {
      console.error('Error fetching employees:', error)
      setError('Failed to load employees')
      setInitialLoading(false)
    }
  }

  const fetchTask = async () => {
    try {
      const task = await taskService.getById(id)
      setFormData({
        title: task.title,
        status: task.status,
        due_date: task.due_date,
        employee_id: task.employee_id
      })
    } catch (error) {
      console.error('Error fetching task:', error)
      setError('Failed to load task')
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate employee_id
    if (!formData.employee_id) {
      setError('Please select an employee')
      setLoading(false)
      return
    }

    try {
      const taskData = {
        ...formData,
        employee_id: parseInt(formData.employee_id)
      }

      if (isEdit) {
        await taskService.update(id, taskData)
      } else {
        await taskService.create(taskData)
      }
      navigate('/tasks')
    } catch (error) {
      console.error('Error saving task:', error)
      setError(error.response?.data?.errors?.join(', ') || 'Failed to save task')
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading form...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-8">
        <button
          onClick={() => navigate('/tasks')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Tasks
        </button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {isEdit ? 'Edit Task' : 'Create New Task'}
        </h1>
        <p className="text-gray-600">
          {isEdit ? 'Update the task details below' : 'Fill in the details to create a new task'}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start"
          >
            <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="e.g., Design landing page mockup"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status *
              </label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-all"
                >
                  <option value="Pending">🔴 Pending</option>
                  <option value="In Progress">🟡 In Progress</option>
                  <option value="Completed">🟢 Completed</option>
                </select>
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                required
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Assign to Employee *
            </label>
            {employees.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
                <p className="text-sm">No employees available. Please add employees first.</p>
              </div>
            ) : (
              <div className="relative">
                <select
                  required
                  value={formData.employee_id}
                  onChange={(e) => {
                    const value = e.target.value
                    setFormData({ ...formData, employee_id: value ? parseInt(value) : '' })
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-all"
                >
                  <option value="">Select an employee...</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} - {employee.role}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Choose the team member responsible for this task
            </p>
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || employees.length === 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                isEdit ? '✓ Update Task' : '+ Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default TaskForm
