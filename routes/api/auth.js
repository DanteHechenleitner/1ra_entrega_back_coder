import {Router} from 'express' 
import UserManagerDB from '../../dao/Controllers/userManagerDB.js'

const authRouter = Router()

authRouter
.post('/login', UserManagerDB.login)
.post('/register', UserManagerDB.create)
.post('/logout', UserManagerDB.logout)

export default authRouter