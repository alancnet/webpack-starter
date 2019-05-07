const app = require('./app')

app.listen().catch((err) => {
  console.log(err.toString())
  process.exit(1)
})