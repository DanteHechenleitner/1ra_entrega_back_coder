/*import { Router } from 'express'
import passport from 'passport';

const router = Router()

const auth = (req, res, next) => {
  if (req.user) {
    return next()
  }
  console.log(req.user)
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

router.get('/profile', (req, res) => {
  res.render('profile')
})

export default router*/