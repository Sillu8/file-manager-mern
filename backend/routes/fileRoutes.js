const express = require('express');
const router = express.Router();

const { fileUpload, getFiles, getAllFiles, downloadFile } = require('../controllers/fileControllers');
const upload = require('../utils/multer');



router.route('/')
  .get(getFiles)
  .post(upload.single('file'), fileUpload);

router.get('/all', getAllFiles);
router.get('/download/:id', downloadFile)

module.exports = router;