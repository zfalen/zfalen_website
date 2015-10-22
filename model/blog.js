
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BlogSchema   = new Schema({
    name: String,
    subtitle: String,
    postDate: Date
});

module.exports = mongoose.model('Blog', BlogSchema);