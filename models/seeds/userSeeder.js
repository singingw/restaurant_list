const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const User = require('../user')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10))
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10))
  }
]

db.once('open', async () => {
  for (let i = 0; i < SEED_USER.length; i++) {
    const email = SEED_USER[i].email
    await User.findOne({ email })
      .then(user => {
        if (!user) {
          return User.create(SEED_USER[i])
        }
      })
      .catch(err => console.error(err))
  }
  db.close()
  process.exit()
})

