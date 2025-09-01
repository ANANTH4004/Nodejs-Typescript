import express from 'express'

const app = express()
const port = process.env.DEV_PORT

app.use(express.json())

app.use('/', (req, err) => {
  console.log('Request receieve')
})

app.listen(3000, () => {
  console.log(`App is running on ${port}`)
})
