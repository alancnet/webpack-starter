const app = require('./app')

/* TODO: Add handlers */

app.listen().catch((err) => {
  console.log(err.toString())
  process.exit(1)
})