import { Router } from 'express'

import UserModel from '../models/userSchema.js'
import { createHash, validatePassword } from '../../Utils/index.js'

const router = Router()



router.post('/login', async (req, res) => {

  const {
    body: {
      email,
      password,
    }
  } = req

  if (
    !email ||
    !password
  ) {
    return res.render('login', { error: 'Todo los campos debe venir en la solicitud.' })
  }

  const user = await UserModel.findOne({ email })

  if (!user) {
    return res.render('login', { error: 'Email o password invalido.' })
  }

  if (!validatePassword(password, user)) {
    return res.render('login', { error: 'Email o password invalido.' })
  }

  req.session.user = user

  res.redirect('/profile')
})

router.post('/register', async (req, res) => {
  const {
    body: {
      first_name,
      last_name,
      email,
      age,
      password,
    }
  } = req

  if (
    !first_name ||
    !last_name ||
    !email ||
    !age ||
    !password
  ) {
    return res.render('register', { error: 'Todo los campos debe venir en la solicitud.' })
  }
  try {
    await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
    })
    
    res.redirect('/login')

  } catch (error) {
    res.render('register', { error: 'El correo ya existe en la db.' })
  }

})

router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if (!error) {
      res.redirect('/login')
    } else {
      res.send({status: 'Logout Error', body: error })
    }
  })
})

router.post('/reset-password', async (req, res) => {

  const {
    body: {
      email,
      password,
    }
  } = req

  if (
    !email ||
    !password
  ) {
    return res.render('reset-password', { error: 'Todo los campos debe venir en la solicitud.' })
  }

  const user = await UserModel.findOne({ email })

  if (!user) {
    return res.render('reset-password', { error: 'Email no existe.' })
  }

  user.password = createHash(password)

  await UserModel.updateOne({ email }, user) // Option 1

  // await UserModel.updateOne({ email }, { $set: { password: createHash(password) }}) // Option 2

  res.redirect('/login')
})

export default router