const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileLoc: {
    type: String,
    // required: true,
  },

}, { timestamps: true })

module.exports = mongoose.model('File', fileSchema);