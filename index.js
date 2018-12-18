const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const shortid = require('shortid')
const app = express()
const port = 3000

// Import models defined in another file
const Url = require('./models/url')

// Initialize Express settings
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: true}))

// Connect mongodb
const mongoURI = 'mongodb://localhost/url-shortener'
mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, db) => {
  if (err) console.log('Error: ', err)
  console.log(`Connected to MongoDB`)
})

// Define the endpoint '/' to show all urls
app.get('/', (req, res) => {
  Url.find((err, docs) => {
    if (err) console.log('Error: ', err)
    res.render('index', {urls: docs})
  })
})

// Create a short URL
app.post('/urls', (req, res) => {
  const originalUrl = req.body.url

  try {
    new URL(originalUrl) 
    // use the URL object to check the originalUrl valid or not
  } catch (e) {
    console.log('Error: ', e)
    return res.send('This url is invalid.')
  }

  const url = new Url({
    originalUrl: originalUrl,
    shortUrl: shortid.generate()
    // use the shortid 3-party library to generate an unique id as shortUrl
  })

  Url.findOne({originalUrl: url.originalUrl}, (err, doc) => {
    if (err) return res.send(err)
    if (doc) {
      res.redirect('/')
    } else {
      url.save((err, url) => {
        if (err) console.log('Error: ', err)
        res.redirect('/')
      })
    }
  })
})

// Get original URL
app.get('/:shortened_id', (req, res) => {
  const shortenedId = req.params.shortened_id

  Url.findOne({shortUrl: shortenedId}, (err, doc) => {
    if (err) return res.send(err)
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
