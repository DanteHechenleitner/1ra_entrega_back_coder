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

import sessionsApiRouter from '../dao/mongoManager/sessions.js'
import sessionsViewsRouter from '../dao/mongoManager/viewsSessions.js'

const router = Router()

router.use('/api/sessions', sessionsApiRouter)
router.use('/', sessionsViewsRouter)

export default router