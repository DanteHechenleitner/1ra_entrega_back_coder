import { Server } from 'socket.io'

import MensajeModel from './dao/models/menssageSchema.js'

let io

export const initS = (httpServer) => {
  io = new Server(httpServer)

  io.on('connection', async (socketClient) => {
    console.log('Nuevo cliente conectado', socketClient.id)

    socketClient.on('new-message', async (data) => {
      const mensaje = await MensajeModel.create(data)
      io.emit('notification', mensaje)
    })
    socketClient.on('disconection', () => {
      console.log('Se desconecto el cliente con el id', socketClient.id)
    })
  })

}

export const emit = (mensaje) => {
  io.emit('notification', mensaje)
}