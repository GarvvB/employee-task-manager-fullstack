import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { execAsync } from './database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const schema = fs.readFileSync(join(__dirname, 'schema.sql'), 'utf-8')
const seed = fs.readFileSync(join(__dirname, 'seed.sql'), 'utf-8')

async function initDatabase() {
  try {
    await execAsync(schema)
    console.log('✓ Database schema created')
    
    await execAsync(seed)
    console.log('✓ Database seeded with sample data')
    
    console.log('Database initialization complete!')
    process.exit(0)
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  }
}

initDatabase()
