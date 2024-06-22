const app = require('./config/server')
const { PORT } = require('./config')

const port = PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
