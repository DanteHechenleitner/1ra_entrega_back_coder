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

const router = Router()

router.use('/api/sessions', sessionsApiRouter)
router.use('/', sessionsViewsRouter)
router.get('/github/callback', passport.authenticate('github', {scope:['user:email']}))


///// Utilizando JWT para el deafio clase 21

const JWTAuth = async (req, res, next) => {
    const { headers } = req
    console.log('headers', headers);
    if (await isValidToken(headers.authorization)) {
      return next()
    }
    res.status(401).json({ success: false, message: 'No autorizado.' })
}
  
router.get('/private', JWTAuth, (req, res) => {
    res.send('<h1>Hello world!</h1>')
})
  
const user = {
    fullname: 'Patricia Ruiz',
    email: 'pr@gmail.com',
    password: 'qwerty',
}
  
router.post('/login', (req, res) => {
    const { body: { email, password } } = req
  
    if (user.email === email && user.password === password) {
      return res.status(200).json({ success: true, access_token: tokenGenerator(user) })
    }
  
    res.status(401).json({ success: false, message: 'Email or password is invalid.' })
  
})

export default router