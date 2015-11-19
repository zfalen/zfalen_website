require('dotenv').load();
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var db = require('./model/db');
var Blog = require('./model/blog');
var passportLocal = require('passport-local');
var passport = require('passport');
var flash = require('connect-flash');

var morgan= require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var router = express.Router();
var Twit = require('twit');
var axios = require('axios');
var _ = require('lodash');


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options("*", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
});

var T = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var fetchTweets = function(req, res){
  var twitterHandle = req.params.twitterHandle;

    T.get('statuses/user_timeline', {screen_name: twitterHandle, count: 1},
          function (err, data, response){
            res.send(data);  
            })
}; 

app.use('/api/handle/:twitterHandle', fetchTweets);



require('./config/passport')(passport); // pass passport for configuration
app.set('view engine', 'ejs'); // set up ejs for templatinga

app.use(morgan('dev'));
app.use(cookieParser());




// Passport Stuff
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/userRoutes')(app, passport); // load our routes and pass in our app and fully configured passport

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});


app.get('/', function(req, res){
    res.readFile('index.html')
});

router.route('/blog')
    .post(function(req, res) {
        
        var blog = new Blog();
        blog.name = req.body.name;
        blog.subtitle = req.body.subtitle;
        blog.postDate = req.body.postDate;

        blog.save(function(err) {
            if (err)
                res.send(err);

            res.json(blog);
        });
        
    })

    .get(function(req, res) {
        Blog.find(function(err, blog) {
            if (err)
                res.send(err);

            res.json(blog);
        });
    
    })

router.route('/blog/:blog_id')

    .get(function(req, res) {
        Blog.find(function(err, blog) {
            if (err)
                res.send(err);

            res.json(blog);
        });
    
    })

    .put(function(req, res) {

        Blog.findById(req.params.blog_id, function(err, blog) {

            if (err)
                res.send(err);

            blog.name = req.body.name;
            blog.subtitle = req.body.subtitle;
            blog.postDate = req.body.postDate;

            blog.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Blog updated!' });
            })
        })
    })
    
    .delete(function(req, res) {
        Blog.remove({
            _id: req.params.blog_id
        }, function(err, blog) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        })
    })
        
    

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /blog
app.use('/api', router);

var port = process.env.PORT || 3000;

app.listen(port);
console.log('The magic is happening on port ' + port)

