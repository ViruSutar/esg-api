const multer = require("multer");


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "files");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|xlsx|xls|)$/)) {
        return cb(new Error("File format not supported"));
      }
  
      cb(null, `${Date.now()}.${ext}-${file.originalname}`);
    },
  });

  const upload = multer({
    storage: multerStorage,
    dest: "../Files",
    limits: {
      fileSize: 4000000,
    },
  });

  const handleError = function (err, req, res, next) {
    if (err instanceof multer.MulterError) { // Handle Multer errors
      res.status(400).json({ message: err.code }); // Send error response as JSON
    } else {
      res.status(500).json({ message:err.message }); // Send error response as JSON
    }
  };

module.exports = {multerStorage,handleError,upload}