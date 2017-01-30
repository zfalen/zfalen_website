
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BlogSchema   = new Schema({
    name: String,
    subtitle: String,
    body: String,
    img: String,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    date: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Blog', BlogSchema);
