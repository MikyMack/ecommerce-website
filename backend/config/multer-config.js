// backend/config/multer-config.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'product_images', // Folder name in Cloudinary
        format: async (req, file) => file.mimetype.split('/')[1], 
        public_id: (req, file) => file.originalname.split('.')[0], 
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
