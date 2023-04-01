import MensajeModel from '../models/menssageSchema.js'
import { emit } from '../../socket.js'

class MessageManagerDB {
//CREO MENSAJES
  static async create(req, res) {
    const { body } = req
    const mensaje = await MensajeModel.create(body)
    emit(mensaje)
    res.status(201).json(mensaje)
  }
//BUSCO TODOS LOS MENSAJES
  static async get(req, res) {
    const result = await MensajeModel.find()
    res.status(200).json(result)
  }
//BUSCO MENSAJES POR ID
  static async getById(req, res) {
    const { params: { id } } = req
    const result = await MensajeModel.findById(id)
    if (!result) {
      return res.status(404).end()
    }
    res.status(200).json(result)
  }
//MODIFICO MENSAJES POR ID
  static async updateById(req, res) {
    const { params: { id }, body } = req
    await MensajeModel.updateOne({ _id: id }, { $set: body })
    res.status(204).end()
  }
//ELIMINO MENSAJES POR ID
  static async deleteById(req, res) {
    const { params: { id } } = req
    await MensajeModel.deleteOne({ _id: id })
    res.status(204).end()
  }

}

export default MessageManagerDB;