import { Router } from "express";

import cartsRouter from "./carts.js";
import routerProducts from "./products.js";
import routerMessages from "./messages.js";
import routerUsers from "./users.js";
import authRouter from "./auth.js";
import routerGitHub from "./github.js";
import routerLog from "./login.js";
import purchaseRouter from "./purchase.js";
import serviceRouter from "./services.js";
import Utils from "../../Utils/index.js";

const routerBack = Router()

routerBack
.use('/', authRouter)
.use('/', routerGitHub)
.use('/', routerLog)
.use('/',purchaseRouter)
.use('/',serviceRouter)
.use('/apiC', cartsRouter)
.use('/apiP', routerProducts)
.use('/apiM', routerMessages)
.use('/apiU', routerUsers)
.use('/current', Utils.authJWTMiddleware(['admin', 'usuario']),(req, res) => {
    res.json({ success: true, message: 'Esta es una ruta privada', user: req.user })
})


export default routerBack