import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
import passport from 'passport'
import Exception from './exception.js'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

class Utils {
  static tokenGenerator = (user) => {
    const payload = {
      id: user._id,
      first_name: user._first_name,
      last_name: user._last_name,
      email: user.email,
      role: user.role
    }
    const token = jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '24h' })
    return token
  }
  static isValidToken = (token) => {
    return new Promise((resolve) => {
      jsonwebtoken.verify(token, JWT_SECRET, (error, payload) => {
        if (error) {
          console.log('error', error)
          return resolve(false)
        }
        console.log('payload', payload)
        return resolve(payload)
      })
      return token
    }
    )
  }
  static createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }

  static validatePassword = (password, user) => {
    return bcrypt.compareSync(password, user.password)
  }

  static authJWTMiddleware = (roles) => (req, res, next) => {
    passport.authenticate('jwt', function (error, user, info) {
      console.log(user);
      if (error) {
        return next(error)
      }
      if (!user) {
        return next(new Exception('Unauthorized', 401))
      }
      if (!roles.includes(user.role)) {
        return next(new Exception('Forbidden', 403))
      }
      if (user.role === 'user' && req.params.id && req.params.id !== user.id) {
        return (new Exception('Forbidden', 403))
      }
      req.user = user
      next()
    })(req, res, next)
  }
  static authorizationMiddleware = (role) => (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ success: false, message: 'Unauthorized' })
    }
    next()
  }


}

export default Utils

