const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const mongoURI = 'mongodb://localhost/l3-express-url-shortener'
mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, db) => {
  if (err) console.log(`Error`, err)
  console.log(`Connected to MongoDB`)
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
)
