import fs from 'fs' ;
import path from 'path' ; // Import the path module to work with file paths 
const validateImageExists = (req, res, next) => {
    const { imageName } = req.body;
    if(imageName && !imageName.startsWith('http://') && !imageName.startsWith('https://')) {
        const imagePath = path.join(__dirname,'../uploads/', imageName);
        if(!fs.existsSync(imagePath)) {
            return res.status(400).json({
                 message: 'Image does not exist'
                 });   
       
    }
}
next(); 
}
export default validateImageExists;