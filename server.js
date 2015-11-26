require('dotenv').load();
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var Blog = require('./model/blog');
var Comment = require('./model/comment');
var User = require('./model/user');
var passportLocal = require('passport-local');
var passport = require('passport');
var flash = require('connect-flash');

var morgan= require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

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


// PASSPORT
// ==========================================

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config/passport')(passport); // pass passport for configuration

require('./routes/userRoutes.js')(app, passport); // routes for passport




// ROUTES FOR THE TWITTER API
// ==========================================

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




// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();
var nodemailer = require('nodemailer');
var email   = require('emailjs');

var static_path = path.join(__dirname, '/');

app.use(express.static('public'));


router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});




router.route('/sayHello')

    .post(function(req, res){

        var server  = email.server.connect({
           user: "zfalen0109@gmail.com", 
           password: "Bluedog1", 
           host: "smtp.googlemail.com", 
           ssl: true,
           port: 465
        });

        var message = {
           text:    "i hope this works", 
           from:    "me <zfalen0109@gmail.com>", 
           to:      "Zach Falen <zfalen0109@gmail.com>, Zach Falen <zach.falen@partnerscreative.com>",
//           cc:      "else <else@your-email.com>",
           subject: ("WEBSITE SUBMISSION FROM: " + req.body.name + " <" +req.body.email + "> - "),
           attachment: {data:"<html><strong>" + req.body.subject + ": </strong></br>" + req.body.body + "</html>", alternative:true}
        };

        // send the message and get a callback with an error or details of the message that was sent
        server.send(message, function(err, message) { console.log(err || message); });
    })


router.route('/user')

      .get(function(req, res) {

        if (req.user) {
          console.log(req.user)
          mongoose.model('User').findById({
              _id: req.user._id
            },
            function(err, user) {
              if (err) {
                return console.log(err);
              } else {
                res.send(user)
              }
            });
        } else {
          res.send({
            user: "anonymous"
          })
        }
      })



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
        Blog.find({}).populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'facebook.name facebook.picture'
        }
      }).exec(function(err, blog) {
            if (err)
                res.send(err);

            res.json(blog);
        });  
    })




router.route('/blog/:blog_id')

    .get(function(req, res) {
        Blog.findById(req.params.blog_id).populate('comments').exec(function(err, blog) {
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
            user: req.user,
            blog: req.params.blog_id
            
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
                        console.log(comment);
                        res.send(comment);
                        }
            })}
        })   
    })

    .get(function(req, res) {
        mongoose.model('Blog').findById({
                        _id: req.params.blog_id
                    }).populate({
                        path: 'comments',
                        populate: {
                            path: 'user',
                            select: 'facebook.name facebook.picture'
                        }
                    }).exec(function(err, blog){
                        if(err){
                            res.send(err)
                        } else {
                            res.send(blog);
                        }
                    })
                })


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

app.use(express.static(static_path))
  .get('/', function (req, res) {
      res.render('index', {
          user: req.user,
          root: static_path
      });
  }).listen(process.env.PORT || 3000, function (err) {
      if (err) {
        console.log(err);
        return;
      }
  console.log('The magic happens at ' + ':' + port);
});
