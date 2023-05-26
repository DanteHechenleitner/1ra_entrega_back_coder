import passport from 'passport'

export const authMiddleware =  (strategy) => (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {  
      if (error) {
        return next(error)
      }
      if (!user) {
        return res.status(401).json({ success: false, message: info.message ? info.message : info.toString() })
      }
      req.user = user
      next()
    })(req, res, next)
}
  
export const authentionMiddleware = (rol) => (req, res, next) => {
    if (req.user.rol !== rol) {
      return res.status(403).json({ success: false, message: 'Forbidden' })
    }
    next()
}