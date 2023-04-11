import { Router } from 'express'

const router = Router()

const auth = (req, res, next) => {
  if (req.session.user) {
    return next()
  }
  res.redirect('/login')
}

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/reset-password', (req, res) => {
  res.render('reset-password')
})

router.get('/profile', auth, (req, res) => {
  res.render('profile', req.session.user)
})

export default router