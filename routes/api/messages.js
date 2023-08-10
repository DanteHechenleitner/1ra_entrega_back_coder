import { Router } from 'express'
import MessageManagerDB from "../../dao/Controllers/messageManagerDB.js"
import Utils from '../../Utils/index.js'

const routerMessages = Router()


routerMessages
.get('/get', MessageManagerDB.get)
.post('/post', MessageManagerDB.create)
.get('/get/messages/:id', MessageManagerDB.getById)
.put('/put/messages/:id', MessageManagerDB.updateById)
.delete('/delete/messages/:id', MessageManagerDB.deleteById)

export default routerMessages