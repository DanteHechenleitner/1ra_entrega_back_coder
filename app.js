
/*import express from 'express'
import routerProducts from './routes/productsM.js'
import { init } from './dao/mongoDB/mongoDB.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'

import ProductManagerM from './dao/mongoManager/productsModel.js'

const PORT = process.env.PORT_NODE || 8080
const ENV = process.env.NODE_ENV || 'local'

init()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static( __dirname + '/public'))
app.use(express.static( __dirname + '/views/layouts'))

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}/ in ${ENV} environment.`)
})

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/mongo', routerProducts)

export default app*/