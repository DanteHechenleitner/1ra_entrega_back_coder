import { Router } from 'express';
import LoginsManager from '../dao/mongoManager/loginManagerDB.js';

const routerLog = Router();

//Login
routerLog.post('/login', LoginsManager.login);
//Registro
routerLog.post('/register', LoginsManager.register);
//Logout
routerLog.get('/logout', LoginsManager.logout);
//Current
routerLog.get('/current', LoginsManager.current);
// Reset Password
routerLog.post('/reset-password', LoginsManager.resetPassword);

export default routerLog;