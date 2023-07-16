export default class CustomError {
    static createError({ title = 'Error', cause, message, code = 1 }) {
      const error = new Error(message, { cause })
      error.title = title
      error.code = code
      throw error
    }
}