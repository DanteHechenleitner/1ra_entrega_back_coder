import { Router } from 'express';
import passport from 'passport';

const routerLogVista = Router();

routerLogVista
.get('/login', (req, res) => {res.render('login');})
.get('/register', (req, res) => {res.render('register');})
.get('/reset-password', (req, res) => {res.render('reset-password');})
.get('/profile', (req, res) => {res.render('profile');})
.get('/current', (req, res) => {res.render('profile');})

export default routerLogVista
