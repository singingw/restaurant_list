const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant') // 載入 Restaurant model
const app = express()
const port = 3000
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
// 設置路由、回應
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
app.get('/restaurant/new', (req, res) => {
  return res.render('new')
})

app.put('/restaurants', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  // $regex 提供了在查詢 (query) 中找到符合的字串
  // $options: 'i' 代表大小寫皆可
  // $or 代表任一條件符合皆可
  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { name_en: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } }
    ]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants, isSearchExist: restaurants.length, keyword }))
    .catch(err => console.error(err))
})
app.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.delete('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then((restaurant) => res.redirect('/'))
    .catch(error => console.log(error))
})
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const updatedRest = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = updatedRest.name
      restaurant.name_en = updatedRest.name_en
      restaurant.category = updatedRest.category
      restaurant.image = updatedRest.image
      restaurant.location = updatedRest.location
      restaurant.phone = updatedRest.phone
      restaurant.google_map = updatedRest.google_map
      restaurant.rating = updatedRest.rating
      restaurant.description = updatedRest.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/${id}`))
    .catch(error => console.log(error))
})