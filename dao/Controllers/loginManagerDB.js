import jwt from 'jsonwebtoken';
import Utils from "../../Utils/index.js"
import bcrypt from 'bcrypt';
import Carts from '../cartsDao.js';
import Users from '../usersDao.js';


class LoginsManager {
    static async login(req, res) {
      const { email, password } = req.body;
    
      try {
        const user = await Users.getUserLog({ email });
    
        if (!user || !( Utils.validatePassword(password, user))) {
          return res.status(401).json({ error: 'Email o contraseña inválidos' });
        }
    
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    
        // Actualizar el campo "status" del usuario a "active"
        user.status = 'active';
        
        // Actualizar el campo "last_connection" del usuario con la fecha y hora actual
        user.last_connection = new Date();
    
        await user.save(); // Guardar los cambios en la base de datos
    
        // Si el usuario es adminCoder@coder.com
        if (user.email === 'adminCoder@coder.com') {
          user.role = 'admin';
          await user.save(); // Guardar los cambios en la base de datos
        }
        
        
        res.redirect('/profile');
        
      } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
      }
    }
  
    static async register(req, res) {
      const { first_name, last_name, email, age, password } = req.body;
    
      try {
        const newCart = await Carts.createCart({});
        const cartId = newCart._id;
    
        const newUser = await Users.createUser({
          first_name,
          last_name,
          email,
          age,
          password: Utils.createHash(password),
          cart: cartId,
          status: 'inactive',
          last_connection: new Date(),
        });
    
        newCart.user = newUser._id;
        await newCart.save();
    
        
        res.redirect('/login')
      } catch (error) {
        res.status(500).json({ error: 'Error al registrar al usuario' });
      }
    }
  
    // Solucionar el error LOGAUT
    static async logout(req, res) {
      try {

        const { body: { email } } = req
        const user = await Users.getUserLog({ email });
    
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    
        // Actualizar el campo "status" del usuario a "inactive"
        user.status = 'inactive';
    
        // Actualizar el campo "last_connection" del usuario con la fecha y hora actual
        user.last_connection = new Date();
    
        await user.save(); // Guardar los cambios en la base de datos
    
       
        res.json({ message: 'Sesión cerrada exitosamente' });
      } catch (error) {
        res.status(500).json({ error: 'Error al cerrar la sesión' });
      }
    }
    
    static async current(req, res) {
      const { authorization } = req.headers;
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No se proporcionó un token válido' });
      }
      const token = authorization.substring(7); // Eliminar "Bearer " del token
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await Users.getUserLog({ _id: userId });
  
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
  
        res.json({ user });
      } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
      }
    }
  
    static async resetPassword(req, res) {
      const { email, password } = req.body;
  
      try {
        const user = await Users.getUserLog({ email });
  
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
  
        // Actualizar la contraseña del usuario
        user.password = await bcrypt.hash(password, 10);
        await user.save();
  
        res.json({ message: 'Contraseña restablecida exitosamente' });
      } catch (error) {
        res.status(500).json({ error: 'Error al restablecer la contraseña' });
      }
    }
  
}
  
export default LoginsManager;