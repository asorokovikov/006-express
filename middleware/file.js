const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'public/books');
  },
  filename(req, file, callback) {
    const timestamp = Math.floor(Date.now() / 1000);
    // const filename = `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`;
    callback(null, String(timestamp));
  }
})

const allowedTypes = ['image/png', 'image,jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
    return;
  }
  cb(null, false);
}

module.exports = multer({
  storage,
  fileFilter,
});