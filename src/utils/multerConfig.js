import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    console.log('Base URL:', req.originalUrl);

    let folder = 'others';

    if (req.originalUrl.includes('/teachers')) {
      folder = 'teachers';
    } else if (req.originalUrl.includes('/posts')) {
      folder = 'posts';
    } else if (req.originalUrl.includes('/avatars')) {
      folder = 'avatars';
    }

    cb(null, path.join(__dirname, '../../uploads/', folder));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../uploads/');
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, uniqueSuffix + path.extname(file.originalname));
//     }
// });



export const upload = multer({ storage: storage });
