const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()
const handlers = require('./lib/handlers')
// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => res.render('home'))

const fortunes = [
  "Honesty is the first chapter in the book of wisdom.",
  "There is only one corner of the universe you can be certain of improving, and that's your own self.",
  "I have not failed. I've just found 10,000 ways that won't work.",
  "The secret of getting ahead is getting started.",
  "It is during our darkest moments that we must focus to see the light.",
]

app.get('/quotes', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render('quotes', { fortune: randomFortune })
})

app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))