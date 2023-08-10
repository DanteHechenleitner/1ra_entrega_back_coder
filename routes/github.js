import { Router } from 'express'
import passport from 'passport'
import { Strategy as GithubStrategy } from 'passport-github2'
import UserModel from '../dao/models/userSchema.js'


const routerGitHubVista = Router()

const githubOptions = {
    clientID: process.env.GITHUB_CLIENT_ID, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CLIENT_CALLBACK
}

passport.use(new GithubStrategy(githubOptions, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('profile', profile)
      let user = await UserModel.findOne({ email: profile._json.email })
      if (!user) {
        user = await UserModel.create({
          first_name: profile._json.name,
          last_name: profile._json.last_name,
          email: profile._json.email,
          age: 18,
          password: "",
        })
      }
      console.log('user', user);
      done(null, user)
    } catch (error) {
      return done(new Error('Error al obtener el usuario:' + error.message))
    }
}))

routerGitHubVista.get('/api/sessions/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    req.session.user = req.user
    res.redirect('/profile')
})
export default routerGitHubVista