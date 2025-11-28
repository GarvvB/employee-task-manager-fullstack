import express from 'express'
import cors from 'cors'
import employeeRoutes from './routes/employeeRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import { logger } from './middleware/logger.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
  res.json({ message: 'Employee Task Manager API', version: '1.0.0' })
})

app.use('/employees', employeeRoutes)
app.use('/tasks', taskRoutes)
app.use('/dashboard', dashboardRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
