const multer = require('multer');
const path = require('path');

module.exports = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/files/')
        },
        filename: function (req, file, cb) {
            const nameOfFile = Math.round(Math.random() * 1E9) + '-' + Date.now() + path.extname(file.originalname)
            cb(null, nameOfFile)
        }
    }),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.docx' && ext !== '.DOCX' && ext !== '.doc') {
            cb(new Error('Unsupported file type!'), false);
            return;
        }
        cb(null, true);
    },
});
