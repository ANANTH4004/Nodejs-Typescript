import express from 'express'
import authRoutes from './routes/authRoutes'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.DEV_PORT

app.use(express.json())

app.use('/auth', authRoutes)

app.use('/', (req, err) => {
  console.log('Request receieve')
})

app.listen(3000, () => {
  console.log(app)
  console.log(`App is running on ${port}`)
})
