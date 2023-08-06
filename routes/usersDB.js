import { Router } from "express";
import UserManagerDB from "../dao/mongoManager/userManagerDB.js";
import Utils from "../Utils/index.js"
import passport from 'passport'
const routerUsers = Router ()

routerUsers
.get('/users',Utils.authJWTMiddleware(['admin']), UserManagerDB.get) //devuelve todos los usuarios
.post('/',Utils.authJWTMiddleware(['admin']),UserManagerDB.create) // crea un usuario
.get('/:id',Utils.authJWTMiddleware(['admin', 'user']), UserManagerDB.getById) // muestra usuario por id
.put('/:id',Utils.authJWTMiddleware(['admin','user']), UserManagerDB.updateById) //modicia usuario por id
.delete('/:id',Utils.authJWTMiddleware(['admin','user']), UserManagerDB.deleteById) //elimina usuario por id
.get('/premium/:id',Utils.authJWTMiddleware(['admin']), UserManagerDB.changeUserRole) // cambia el role si sube documentos
.get('/management/:id',Utils.authJWTMiddleware(['admin']), UserManagerDB.managementRole) // cambia el role desde la vista management
.post('/:id/documents',Utils.authJWTMiddleware(['admin','user','premium']), UserManagerDB.uploadImage) //sube documentos
.get('/',Utils.authJWTMiddleware(['admin']), UserManagerDB.getData) // devuelve todos los usuarios solo con nombre completo, email y role
.delete('/',Utils.authJWTMiddleware(['admin']), UserManagerDB.deleteInactiveUsers)

export default routerUsers