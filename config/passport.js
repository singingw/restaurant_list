const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { type: 'warning_msg', message: 'email 尚未註冊。' })
        } 
        //bcrypt.compare 方法，用來判斷使用者登入時輸入的密碼，是否與資料庫裡的雜湊值一致
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, { type: 'warning_msg', message: 'Email or Password incorrect.' })
          }
        return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}