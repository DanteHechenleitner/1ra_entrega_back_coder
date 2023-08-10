import { Router } from 'express'
import menssageSchema from '../dao/models/menssageSchema.js'

const routerVistaMensaje = Router()

routerVistaMensaje.get('/', async (req, res) => {
  const mensajes = await menssageSchema.find().lean()
  const scripts = { socket: '/socket.io/socket.io.js', index: 'javascripts/index.js', mensajes: mensajes}
  res.render('mensajes', scripts)
})

export default routerVistaMensaje