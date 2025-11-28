import { runAsync, getAsync, allAsync } from '../db/database.js'

export const Employee = {
  async findAll() {
    return await allAsync('SELECT * FROM employees ORDER BY id')
  },

  async findById(id) {
    return await getAsync('SELECT * FROM employees WHERE id = ?', [id])
  },

  async create(employee) {
    const { name, role, email } = employee
    const result = await runAsync(
      'INSERT INTO employees (name, role, email) VALUES (?, ?, ?)',
      [name, role, email]
    )
    return await this.findById(result.lastID)
  },

  async update(id, employee) {
    const { name, role, email } = employee
    await runAsync(
      'UPDATE employees SET name = ?, role = ?, email = ? WHERE id = ?',
      [name, role, email, id]
    )
    return await this.findById(id)
  },

  async delete(id) {
    const result = await runAsync('DELETE FROM employees WHERE id = ?', [id])
    return result.changes > 0
  }
}
