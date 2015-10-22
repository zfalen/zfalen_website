var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var db = require('./model/db');
var Blog = require('./model/blog');

var app = express();


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




app.listen(3000);

