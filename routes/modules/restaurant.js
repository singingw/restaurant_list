const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
router.get('/search', (req, res) => {
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
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(err => console.error(err))
})
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then((restaurant) => res.redirect('/'))
    .catch(error => console.log(error))
})
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:restaurant_id', (req, res) => {
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
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})
module.exports = router