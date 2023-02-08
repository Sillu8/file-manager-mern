const fs = require('fs');
const path = require('path')
const File = require('../model/fileModel');
const Word = require('../model/wordModel');

//@desc Upload file
//@route /file
const fileUpload = (async (req, res, next) => {
  try {

    const fileExists = await File.findOne({ fileName: req.file.originalname });
    if (fileExists) {
      res.status(400);
      throw new Error('A file by this name already exists!');
    }

    const file = await File.create({
      fileName: req.file.originalname,
      fileLoc: req.file.filename,
    })

    fs.readFile(req.file.path, (err, data) => {
      if (err) {
        res.status(400)
        throw new Error(err);
      }

      const words = new Set(data.toString().split(' '));
      words.forEach(async (word) => {
        Word.create({
          word,
          document: file.fileName,
          documentId: file._id,
        })
      })
    })

    const files = await File.find({});
    res.status(201).json({
      message: "Successfully uploaded!",
      data: files
    })

  } catch (error) {
    next(error);
  }
})

//@desc Get file
//@route /file?q=
const getFiles = (async (req, res, next) => {
  try {
    const term = req.query.q;
    const docIDs = await Word.find({
      word: {
        $regex: new RegExp(term, 'i')
      }
    }).distinct('documentId');

    const files = await File.find({
      _id: {
        $in: docIDs
      }
    })


    res.status(200).json({
      data: files
    })

  } catch (error) {
    console.log(error)
    next(error)
  }
})


//@desc Get file
//@route /file/all
const getAllFiles = (async (req, res, next) => {
  try {
    const files = await File.find({});
    res.status(200).json({
      data: files
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})


//@desc Download a file
//@route /download/:id
const downloadFile = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await File.findById(id);
    const file = path.join(__dirname, '../public/files/', `${doc.fileLoc}`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=file.docx`);
    res.status(200);
    res.sendFile(file)
  } catch (error) {
    console.log(error)
    next(error)
  }
})



module.exports = {
  fileUpload,
  getFiles,
  getAllFiles,
  downloadFile,
}