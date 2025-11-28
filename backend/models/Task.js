import { runAsync, getAsync, allAsync } from '../db/database.js'

export const Task = {
  async findAll(status = null) {
    if (status) {
      return await allAsync('SELECT * FROM tasks WHERE status = ? ORDER BY due_date', [status])
    }
    return await allAsync('SELECT * FROM tasks ORDER BY due_date')
  },

  async findById(id) {
    return await getAsync('SELECT * FROM tasks WHERE id = ?', [id])
  },

  async create(task) {
    const { title, status, due_date, employee_id } = task
    const result = await runAsync(
      'INSERT INTO tasks (title, status, due_date, employee_id) VALUES (?, ?, ?, ?)',
      [title, status, due_date, employee_id]
    )
    return await this.findById(result.lastID)
  },

  async update(id, task) {
    const { title, status, due_date, employee_id } = task
    await runAsync(
      'UPDATE tasks SET title = ?, status = ?, due_date = ?, employee_id = ? WHERE id = ?',
      [title, status, due_date, employee_id, id]
    )
    return await this.findById(id)
  },

  async delete(id) {
    const result = await runAsync('DELETE FROM tasks WHERE id = ?', [id])
    return result.changes > 0
  },

  async getStatistics() {
    const total = await getAsync('SELECT COUNT(*) as count FROM tasks')
    const completed = await getAsync("SELECT COUNT(*) as count FROM tasks WHERE status = 'Completed'")
    const inProgress = await getAsync("SELECT COUNT(*) as count FROM tasks WHERE status = 'In Progress'")
    const pending = await getAsync("SELECT COUNT(*) as count FROM tasks WHERE status = 'Pending'")
    
    return {
      total: total.count,
      completed: completed.count,
      inProgress: inProgress.count,
      pending: pending.count,
      completionRate: total.count > 0 ? ((completed.count / total.count) * 100).toFixed(1) : 0
    }
  }
}
