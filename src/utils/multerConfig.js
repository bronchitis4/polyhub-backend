// import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
  
//   destination: function (req, file, cb) {
//     console.log('Base URL:', req.originalUrl);

//     let folder = 'others';
//     if (req.originalUrl.includes('/teachers')) {
//       console.log('Base URL: teacher',);
//       folder = 'teachers';
//     } else if (req.originalUrl.includes('/posts')) {
//       folder = 'posts';
//       console.log('Base URL: post',);
//     } else if (req.originalUrl.includes('/avatars')) {
//       folder = 'avatars';
//     }

//     cb(null, path.join(__dirname, '../../uploads/', folder));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../uploads/');
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, uniqueSuffix + path.extname(file.originalname));
//     }
// });



// export const upload = multer({ storage: storage });

import multer from 'multer';

// Зберігаємо файли у оперативній пам'яті (RAM), а не в файловій системі
const storage = multer.memoryStorage();
// Приймаємо лише зображення, наприклад JPEG, PNG
const fileFilter = (req, file, cb) => {
  conlose.log(file);

  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Тільки зображення дозволені!'), false);
  }
};

export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // обмеження: 5 MB
});

