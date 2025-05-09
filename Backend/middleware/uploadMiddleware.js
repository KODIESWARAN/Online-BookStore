const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null , 'uploads/')
    },
    filename :function(req,file , cb) {
        cb(null, file.originalname.replace(/\.[^/.]+$/, "") + '_' + Date.now() + path.extname(file.originalname).toLowerCase())
    }
})


const fileFilter = (req,file , cb) => {
  const allowedTypes  = ['image/jpeg', 'image/png' , 'image/jpg'];
  if(allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  }else {
    cb(new Error('Invalid file type,Only JPEG and PNG allowed'),false)
  }
}

const upload = multer({
    storage :storage,
    fileFilter : fileFilter,
    limits :{
        fileSize : 5 * 1024 * 1024
    }
}).single('bookImage')

module.exports = upload