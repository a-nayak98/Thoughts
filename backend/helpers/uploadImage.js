const multer = require("multer");

const multerConfig = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
    fieldSize: 25 * 1024 * 1024,
  },
  fileFilter: (_, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      const newError = new Error("file type is not valid");
      cb(newError, false);
    }
  },
});

const upload = multer(multerConfig);
module.exports = upload;
