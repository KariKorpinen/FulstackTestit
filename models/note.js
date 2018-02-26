const mongoose = require('mongoose')

//const url = 'mongodb://fullnotes:mail3030@ds247058.mlab.com:47058/dbtestifullnodes'
//if ( process.env.NODE_ENV !== 'production' ) {
//  require('dotenv').config()
//}

//const url = process.env.MONGODB_URI

//mongoose.connect(url)

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

module.exports = Note


/*
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

noteSchema.statics.format = (note) => {
  return {
    id: note._id,
    content: note.content,
    date: note.date,
    important: note.important,
    user: note.user
  }
}

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
*/