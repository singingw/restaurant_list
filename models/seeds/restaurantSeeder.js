if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const list = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', async () => {
  const seed = []
  await User.find()
    .then(users => {
      for (let i = 0; i < 6; i++) {
        if (i > 2) {
          list[i].userId = users[1]._id
        } else {
          list[i].userId = users[0]._id
        }
        seed.push(list[i])
      }
      return seed
    })
    .then(async (seed) => {
      await Restaurant.create(seed)
        .catch(err => console.log(err))
      db.close()
      process.exit()
    })
    .catch(err => console.log(err))
})

