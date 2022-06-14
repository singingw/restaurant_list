const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
router.post('/filter', (req, res) => {
  const { sort, category, rating } = req.body
  const userId = req.user._id
  const sortRule = {
    default: { _id: 'asc' },
    name_asc: { name: 'asc' },
    name_desc: { name: 'desc' },
    rating_asc: { rating: 'asc' },
    rating_desc: { rating: 'desc' }
  }

  Restaurant.find({
    $and: [{ userId },
    { category: { $regex: category, $options: 'i' } },
    { rating: { $gte: rating } }]
  })
    .sort(sortRule[sort])
    .lean()
    .then(restaurants => res.render('index', { restaurants, sort, category, rating }))
    .catch(error => console.log(error))
})
module.exports = router