const Restaurant = require('../restaurant')
const list = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  list.forEach(obj => {
    Restaurant.create({
      name: obj.name,
      name_en: obj.name_en,
      category: obj.category,
      location: obj.location,
      google_map: obj.google_map,
      phone: obj.phone,
      rating: obj.rating,
      description: obj.description,
      image: obj.image
    })
  })
  console.log('done')
})

