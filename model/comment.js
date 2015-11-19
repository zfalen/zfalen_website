var mongoose     = require('mongoose');

var CommentSchema = new mongoose.Schema({
    body: String,
    user: String,
    date: { type: Date, default: Date.now },
    blog: {type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
})

mongoose.model('Comment', CommentSchema);