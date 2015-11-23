require('dotenv').load();
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var Blog = require('./model/blog');
var Comment = require('./model/comment');
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


var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');

var options = {
  server:  { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};  
var mongodbUri = process.env.MONGOLAB_URI || "mongodb://localhost";
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);



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


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});


var static_path = path.join(__dirname, '/');

app.get('/', function(req, res){
    res.sendFile('index.html', {
      root: static_path 
  });
});

router.route('/blog')

    .post(function(req, res){
        mongoose.model('Blog').create({
            name: req.body.name,
            subtitle: req.body.subtitle,
            body: req.body.content
            
        }, function(err, blog){
            if (err){
                res.send(err)
            } else {
                blog.save();
                res.send(blog);
                }
            
            }
        )})

    .get(function(req, res) {
        Blog.find({}).populate('comments').exec(function(err, blog) {
            if (err)
                res.send(err);

            res.json(blog);
        });  
    })

router.route('/blog/:blog_id')

    .get(function(req, res) {
        Blog.findById(req.params.blog_id, function(err, blog) {
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


router.route('/blog/:blog_id/comment')
    
    .post(function(req, res){
        mongoose.model('Comment').create({
            body: req.body.body,
            user: req.body.user
            
        }, function(err, comment){
            if (err){
                res.send(err)
            } else {
                mongoose.model('Blog').findById({
                    _id: req.params.blog_id
                }, function(err, blog){
                    if(err){
                        res.send(err)
                    } else {
                        blog.comments.push(comment._id);
                        blog.save();
                        res.send(comment);
                        }
            })}
        })   
    })

    .get(function(req, res) {
        mongoose.model('Blog').findById({
                        _id: req.params.blog_id
                    }, function(err, blog){
                        if(err){
                            res.send(err)
                        } else {
                            mongoose.model('Comment').find(function(err, comments) {
                                if (err)
                                    res.send(err);

                                res.json(comments);
                            })
                        }
        })
    
    })


app.use('/css', express.static('css'));
app.use('/img', express.static('img'));


if (process.env.NODE_ENV === 'production') {
  console.log('*****************-----------------------Running in production mode---------------------**************************');

  app.use('/static', express.static('static'));
    } else {
    // When not in production, enable hot reloading

    var chokidar = require('chokidar');
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.dev');
    var compiler = webpack(webpackConfig);
        
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: false,
      publicPath: webpackConfig.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));

    // Do "hot-reloading" of express stuff on the server
    // Throw away cached modules and re-require next time
    // Ensure there's no important state in there!
    var watcher = chokidar.watch('./server');
    watcher.on('ready', function() {
      watcher.on('all', function() {
        console.log('Clearing /server/ module cache from server');
        Object.keys(require.cache).forEach(function(id) {
          if (/\/server\//.test(id)) delete require.cache[id];
        });
      });
  });
}

        
    

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /blog
app.use('/api', router);

var port = process.env.PORT || 3000;

app.listen(port);
console.log('The magic is happening on port ' + port)

