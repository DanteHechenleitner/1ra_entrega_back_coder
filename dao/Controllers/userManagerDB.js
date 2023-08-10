import userSchema from "../models/userSchema.js";
import cartsSchema from "../models/cartsSchema.js";
import Utils from "../../Utils/index.js"
import Carts from "../cartsDao.js";
import Users from "../usersDao.js";
import { uploader } from "../../utils.js";
import multer from "multer";
import emailService from "../../services/email.service.js"

class UserManagerDB {

    static async create(req, res) {
      const { body } = req;
      const cart = await Carts.createCart({ items: [] }); // se crea el carrito vacío con el registro de usuario
      const user = {
        ...body,
        password: Utils.createHash(body.password),
        cart: cart._id,
        status: 'inactive',
        last_connection: new Date(), // se agrega la propiedad "last_connection" con la fecha y hora actual
      };
      const result = await Users.createUser(user);
      res.status(201).json(result);
    }
  
  
    static async get(req, res) {
      const result = await Users.getUsers()
     res.status(200).json(result)
  
    }
  
    static async getData(req, res) {
      const result = await Users.getUsers()
      const filteredData = result.map(user => ({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
      }));
      res.status(200).json(filteredData);
    }
  
    static async getById(req, res) {
      const { params: { id } } = req
      const result = await Users.getUserById(id)
      if (!result) {
        return res.status(404).end()
      }
      res.status(200).json(result)
    }
  
    static async updateById(req, res) {
      const id = req.params.id
      const data = req.body
      await Users.updateUserById(id, data)
      res.status(200).json({ message: 'Updated' })
    }
  
    static async deleteById(req, res) {
      const { params: { id } } = req
      await Users.deleteUser({ _id: id })
      res.status(204).end()
    }
  
    static async login(req, res) {
      const { body: { email, password } } = req
      const user = await Users.getUserLog({ email })
  
      if (!user) {
        return res.status(401).json({ massage: ' Usuario o Contraseña Incorrecto' })
      }
  
      if (!Utils.validatePassword(password, user)) {
        return res.status(401).json({ massage: ' Usuario o Contraseña Incorrecto' })
      }
      // Si cambia el estado del usuario, pasa a estar activo
      user.status = 'active';
      user.last_connection = new Date(); // se actualiza la propiedad "last_connection" con la fecha y hora actual
      await user.save();
  
      // Si el usuario se crea es con mail adminCoder@coder.com su rol es "admin"
      if (user.email === 'adminCoder@coder.com') {
        user.role = 'admin';
        await user.save();
      }
      
      const token = Utils.tokenGenerator(user)
      res.cookie('token', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
      }).status(200).render('profile', user)
      
    }
  
    static async logout(req, res) {
      const { body: { email } } = req
      const user = await Users.getUserLog({ email })
      user.status = 'inactive'; 
      user.last_connection = new Date(); 
      await user.save();
      
      res.clearCookie('token');
      res.status(200).json({ success: true });
    }

  
    static async changeUserRole(req, res) {
      const { params: { id } } = req;
      const user = await Users.getUserById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      if (user.role === 'premium') {
        return res.status(200).json({ message: 'El usuario ya cuenta con rol premium' });
      }
  
      if (
        !user.documents.identification ||
        !user.documents.proofOfAddress ||
        !user.documents.accountStatement
      ) {
        return res.status(400).json({ message: 'El usuario no ha terminado de procesar su documentación' });
      }
  
      user.role = 'premium';
      await user.save();
  
      res.status(200).json({ message: 'Rol de usuario actualizado exitosamente', newRole: 'premium' });
    }
  
    static async managementRole(req, res) {
      const { params: { id } } = req;
      const user = await Users.getUserById(id);
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
    
      let newRole = '';
      if (user.role === 'user') {
        newRole = 'premium';
      } else if (user.role === 'premium') {
        newRole = 'user';
      } else {
        return res.status(400).json({ message: 'Rol de usuario inválido' });
      }
    
      user.role = newRole;
      await user.save();
    
      res.status(200).json({ message: 'Rol de usuario actualizado exitosamente', newRole });
    }
  
  
    static async uploadImage(req, res) {
      try {
        const { params: { id } } = req;
  
        // se encarga de validar si el usuario existe
        const user = await Users.getUserById(id);
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
  
        
        const upload = multer({ storage: uploader.storage }).fields([
          { name: 'profileImage', maxCount: 1 },
          { name: 'productImage', maxCount: 1 },
          { name: 'document', maxCount: 1 }
        ]);
  
        upload(req, res, async (err) => {
          if (err) {
            return res.status(400).json({ message: 'Error al subir el archivo' });
          }
  
          // se obtienen los archivos subidos
          const profileImage = req.files['profileImage'] ? req.files['profileImage'][0] : null;
          const productImage = req.files['productImage'] ? req.files['productImage'][0] : null;
          const document = req.files['document'] ? req.files['document'][0] : null;
  
  
          res.status(200).json({ message: 'Archivo subido exitosamente' });
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
    }
  
    static async deleteInactiveUsers() {
      try {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        const filter = { last_connection: { $lt: twoDaysAgo } };
    
        // se obtiene lista de los usuarios inactivos
        const inactiveUsers = await Users.lastConnection(filter).lean();
        console.log(inactiveUsers)
    
        // Se envia un correo a cada usuario inactivo y luego se los elimina de la base de datos
        const emailAndDeletePromises = inactiveUsers.map(async (user) => {
          const userEmail = user.email;
          const emailSubject = 'Eliminación de cuenta por inactividad';
          const emailContent = `
            <p>Estimado ${userEmail}</p>
            <p>Su cuenta ha sido eliminada debido a inactividad. Si desea volver a utilizar nuestros servicios, puede crear una nueva cuenta.</p>
            <p>Gracias por su comprensión.</p>
          `;
    
          try {
            await emailService.sendEmail(userEmail, emailSubject, emailContent);
            console.log(`Correo enviado a ${userEmail}: Su cuenta ha sido eliminada por inactividad.`);
            
            // se elimina al usuario de la base de datos después de enviar el correo.
            await Users.deleteInactive(filter); 
          } catch (error) {
            console.error(`Error al enviar el correo a ${userEmail}:`, error);
          }
        });
    
        
        await Promise.all(emailAndDeletePromises);
    
        const deletedUsersCount = emailAndDeletePromises.length;
        console.log(`Se eliminaron ${deletedUsersCount} usuarios inactivos.`);
        return deletedUsersCount;
      } catch (error) {
        console.error('Error al eliminar usuarios inactivos:', error);
        return 0;
      }
    }
}
  
export default UserManagerDB;