import { Router } from "express";
import Utils from "../Utils/index.js";
import routerCartsVista from "./carts.js";
import routerProductVista from "./products.js";
import routerVistaMensaje from "./messages.js";
import routerGitHubVista from "./github.js";
import routerLogVista from "./login.js";
import routerVistaUsers from "./indexUsers.js";

const routerFront = Router()

routerFront
.use('/',  routerGitHubVista)
.use('/', routerLogVista)
.use('/', Utils.authJWTMiddleware(['admin']), routerVistaUsers)
.use('/carrito', routerCartsVista)
.use('/productos', routerProductVista)
.use('/chat', routerVistaMensaje)

export default routerFront

