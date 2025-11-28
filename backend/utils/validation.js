export const validateEmployee = (data) => {
  const errors = []

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required')
  }

  if (!data.role || data.role.trim().length === 0) {
    errors.push('Role is required')
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

export const validateTask = (data) => {
  const errors = []
  const validStatuses = ['Pending', 'In Progress', 'Completed']

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required')
  }

  if (!data.status || !validStatuses.includes(data.status)) {
    errors.push('Status must be one of: Pending, In Progress, Completed')
  }

  if (!data.due_date) {
    errors.push('Due date is required')
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.due_date)) {
    errors.push('Due date must be in YYYY-MM-DD format')
  }

  if (!data.employee_id || isNaN(data.employee_id)) {
    errors.push('Valid employee ID is required')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
