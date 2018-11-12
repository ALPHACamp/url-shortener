const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

const Url = require('./models/url')

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const mongoURI = 'mongodb://localhost/l3-express-url-shortener'
mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, db) => {
  if (err) console.log(`Error`, err)
  console.log(`Connected to MongoDB`)
})

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
)
