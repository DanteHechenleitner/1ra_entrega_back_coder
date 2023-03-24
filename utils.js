import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import multer from 'multer'

export default __dirname;

//CONFIGURACION DE MULTER

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/imgs')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
  
export const uploader = multer({ storage })