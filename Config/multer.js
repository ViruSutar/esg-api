const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv')
dotenv.config({ path: './dev.env' })
// const AWS = require('@aws-sdk/client-s3');
const AWS = require('aws-sdk')

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'esg1-files',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname);
      },
    }),
    fileFilter: function (req, file, cb) {
      // accept only images, PDFs, and Excel files
      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/vnd.ms-excel' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only images, PDFs, and Excel files are allowed.'));
      }
    },
    limits: { fileSize: 4 * 1024 * 1024 }, 
  });
  
  const handleError = function (err, req, res, next) {
    if (err instanceof multer.MulterError) { 
      res.status(400).json({ message: err.code });
    } else {
      res.status(500).json({ message:err.message });
    }
  };

module.exports = {handleError,upload}