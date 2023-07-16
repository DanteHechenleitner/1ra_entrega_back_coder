import { Router } from 'express'
import { generateProduct } from '../utils/index.js'
import CustomError from '../utils/errors/CustomError.js'
import EnumsError from '../utils/errors/EnumsError.js'

const routerMock = Router()

routerMock.get('/mockingproducts', (req, res, next) => {
    try {
        const { count = 100 } = req.query
        if (isNaN(count) || count <= 0) {
            throw new CustomError({
                title: 'Invalid Parameter',
                code: EnumsError.INVALID_PARAM_ERROR,
                message: 'Count should be a positive number',
            })
        }

        const products = []
        for (let i = 0; i < count; i++) {
            products.push(generateProduct())
        }

        res.status(200).json({ status: true, payload: products })
    } catch (error) {
        next(error)
    }
})

export default routerMock