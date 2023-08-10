import { Router } from 'express';
import userSchema from '../dao/models/userSchema.js';
import bodyParser from 'body-parser';

const routerVistaUsers = Router();

routerVistaUsers.use(bodyParser.urlencoded({ extended: true }))

routerVistaUsers.get('/management/:id', async(req, res) => {
    try {
        const  { id }  = req.params
        const user = await userSchema.findById(id)
        
        res.render('userManagement', user)
    } catch (error) {
        console.log(error.message);   
    }
    
});

export default routerVistaUsers;