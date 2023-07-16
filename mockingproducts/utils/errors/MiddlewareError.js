import EnumsError from './EnumsError.js'

export default (error, req, res, next) => {
  console.log(error.cause)
  switch (error.code) {
    case EnumsError.INVALID_TYPES_ERROR:
      res.status(400).send({ status: 'error', error: error.name })
      break;
    case EnumsError.INVALID_PARAM_ERROR:
      res.status(400).send({ status: 'error', error: error.name })
      break;
    case EnumsError.DATABASE_ERROR:
      res.status(500).send({ status: 'error', error: error.name })
      break;
    default:
      res.send({ status: 'error', error: 'Unhadled error' })
  }
}