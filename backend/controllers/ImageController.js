import path from 'path';
import multer from 'multer';
import fs from 'fs';
// export async function uploadImages(req,res){
//     if(req.files.length === 0){
//             throw new Error('Please upload a file');
        
//     }
//     const uploadedImagespaths  =req.files.map(file => path.basename(file.path)); 
     
//     res.status(200).json({
//         message: 'Images uploaded successfully',
//         data: uploadedImagespaths
//     });
// }
export async function uploadImages(req, res) {
    if (!req.file) {
      return res.status(400).send({ message: 'Please upload a file' });
    }
    const uploadedImagespaths = path.basename(req.file.path);
  
    res.status(200).json({
      message: 'Image uploaded successfully',
      filePath: uploadedImagespaths
    });
  }
  

export async function viewImages(req,res){
    const {filename} = req.params;
   const imagePath= path.join(path.join(__dirname, '../uploads/'),filename)
    fs.access(imagePath,fs.constants.F_OK, (err) => {
        if(err){
            return res.status(404).send('Image not found');
        }
        res.sendFile(imagePath);
    })
}


export async function deleteImage(req, res) {
    const { fileName } = req.params;
    const imagePath = path.join(__dirname, '../uploads', fileName);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'Không tìm thấy hình ảnh' });
        }

        fs.unlink(imagePath, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Xóa ảnh không thành công', error: err.message });
            }
            res.status(200).json({ message: 'Xóa ảnh thành công' });
        });
    });
}