const mongoose = require('mongoose');

const wordSchema = mongoose.Schema({

    word: {
      type: String,
    },
    document: {
      type: String,
      required: true,
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File'
    }
    

},{ timestamps: true })

module.exports = mongoose.model('Word', wordSchema);