const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.COULD_API_SECRET,
    cloud_name:process.env.CLOUD_NAME
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Instaharam_DEV',
    allowedFormats:['png','jpg','jpeg','mov','mp4'], 
  },
});

module.exports={
    cloudinary,
    storage
}