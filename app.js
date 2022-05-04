const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')
const port = process.env.PORT || 3000
const app = express()

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(routes)
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})