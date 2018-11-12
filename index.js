const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const bodyParser= require('body-parser')
const app = express()
const port = 3000

const Url = require('./models/url')

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: true}))

const mongoURI = 'mongodb://localhost/l3-express-url-shortener'
mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, db) => {
  if (err) console.log(`Error`, err)
  console.log(`Connected to MongoDB`)
})

app.get('/', (req, res) => {
  Url.find((err, docs) => {
    res.render('index', {urls: docs})
  })
})

app.post('/urls', (req, res) => {
  let url = Url({
    originalUrl: req.body.url,
    shortUrl: Math.random().toString(36).substr(2, 5)
  })
  Url.findOne({originalUrl: url.originalUrl}, (err, doc) => {
    if (err) return console.error(err)
    if (doc) {
      res.redirect('/')
    } else {
      url.save((err, url) => {
        if (err) return console.error(err)
        res.redirect('/')
      })
    }
  })
})

app.get('/:shortened_id', (req, res) => {
  let shortenedId = req.params.shortened_id
  Url.findOne({shortUrl: shortenedId}, (err, doc) => {
    if (err) return console.error(err)
    if (doc) {
      res.redirect(doc.originalUrl)
    } else {
      res.redirect('/')
    }
  })
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
)
