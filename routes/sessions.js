/*import express from "express"

import { uploader } from "../utils.js"

import sessionManager from "../dao/mongoManager/sessions.js"

const routerSessions = express.Router()
routerSessions.use(express.json())

routerSessions
.post('/login',(req,res) => {sessionManager.login(req,res)})
.post('/register',(req,res) => {sessionManager.register(req,res)})


export default routerSessions*/

import { Router } from 'express'
import passport from 'passport'

import sessionsApiRouter from '../dao/mongoManager/sessions.js'
import sessionsViewsRouter from '../dao/mongoManager/viewsSessions.js'
import { tokenGenerator, isValidToken } from '../config/utilsJWT.js'
import { createHash, validatePassword } from '../Utils/index.js'
import UserModel from '../dao/models/userSchema.js'
import {authMiddleware, authentionMiddleware} from '../config/utilsCookie.js'

const router = Router()

router.use('/api/sessions', sessionsApiRouter)
router.use('/', sessionsViewsRouter)
router.get('/github/callback', passport.authenticate('github', {scope:['user:email']}))


///// Utilizando JWT para el deafio clase 22

/*const JWTAuth = async (req, res, next) => {
  const { headers } = req
  if (await isValidToken(headers.authorization.split(' ')[1])) {
    return next()
  }
  res.status(401).json({ success: false, message: 'No autorizado.' })
}

router.get('/private', JWTAuth, (req, res) => {
  res.json({ success: true, message: 'This is a private route.' })
})*/


///// Utilizando Cokies clase 22

router.get('/private', authMiddleware('jwt'), authentionMiddleware('usuario'), (req, res) => {
  res.json({ success: true, message: 'This is a private route.', user: req.user })
})

router.post('/login', async (req, res) => {
  const { body: { email, password } } = req
  const user = await UserModel.findOne({ email })
  if(!user) {
    return res.status(401).json({ success: false, message: 'Email or password is incorrect.' })
  }
  if(!validatePassword(password, user)) {
    return res.status(401).json({ success: false, message: 'Email or password is incorrect.' })
  }
  const token = tokenGenerator(user)
  ///res.status(200).json({ success: true, access_token: token })

  res.cookie('token', token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
  }).status(200).json({ success: true })
})

router.post('/register', async (req, res) => {
  const { body: { fullname, email, password } } = req
  let user = await UserModel.findOne({ email })
  if (user) {
    return res.status(400).json({ success: false, message: 'Email already exists.' })
  }
  user = await UserModel.create({ fullname, email, password: createHash(password) })
  res.status(201).json({ success: true })
})


router.post('/sign-out', (req, res) => {
  res.clearCookie('token').status(200).json({ success: true })
})



export default router