import path from 'path';
import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         const destinationPath = path.join(__dirname, '../uploads/');
//         callback(null, destinationPath);
//     },
//     filename: function (req, file, cb) {
//         const newFileName = `${Date.now()}-${file.originalname}`;
//         cb(null, newFileName);
//     }, 
//     });
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true);
//     } else {
//         cb(new Error('File is not an image'), false);
//     }
// }
// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 1024 * 1024 * 5 // 5MB
//     }
// });
// export default upload
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      const destinationPath = path.join(__dirname, '../uploads/');
      callback(null, destinationPath);
    },
    filename: function (req, file, cb) {
      const newFileName = `${Date.now()}-${file.originalname}`;
      cb(null, newFileName);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('File is not an image'), false);
    }
  };
  
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 1024 * 1024 * 5 // 5MB
    }
  });
  
  export default upload;