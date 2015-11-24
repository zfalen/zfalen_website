var React = require('react');

var SocialBar = require('./socialShare');
var StickyDiv = require('react-stickydiv');


var PostComment = React.createClass({
   
    handleSubmit: function(e){
        e.preventDefault();
        var commentUrl = ('/api/blog/' + this.props.blogId + '/comment');
        
        var commentUser = React.findDOMNode(this.refs.commentUser).value.trim();
        var commentBody = React.findDOMNode(this.refs.commentBody).value.trim();
        
        var data = ({user: commentUser, body: commentBody});
    
        if (!commentUser || !commentBody) {
          return;
        };
        
        var self = this;
        
        $.ajax({
          url: commentUrl,
          dataType: 'json',
          type: 'POST',
          data: data,
          success: function(data) {
              self.props.onPost();
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
        
        React.findDOMNode(this.refs.commentUser).value = '';
        React.findDOMNode(this.refs.commentBody).value = '';
        return;
    },
    
    render: function(){
        var commentBoxStyle = {
                paddingBottom: '6%',
                paddingTop: '0%',
                backgroundColor: '#f9f9f9'
        }
        
        var userStyle = {
            width: '25%',
            marginLeft: '2%'
        }
        var commentStyle = {
            maxWidth: '98%',
            marginLeft: '2%'
        }
        
        var submitStyle = {
            float: 'right',
            marginRight: 10,
            color: '#fff',
            backgroundColor: '#0385F4',
            borderColor: '#036FF4'
            
        }
        
        var formStyle = {
            paddingTop: '15px'
        }
        
        return(
             <div>
                <div className="blog-commentsCounter">
                    <h3 className="blog-commentsCounterText"> {this.props.numComments} Comments </h3>
                </div>
                <form style={formStyle} onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <div className="input-group" style={userStyle}>
                        <div className="input-group-addon"><i className="fa fa-user"/></div>
                        <input type="text" className="form-control" placeholder="Username" ref="commentUser" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group" style={commentStyle}>
                        <div className="input-group-addon"><i className="fa fa-comment"/></div>
                        <textarea type="text" className="form-control" placeholder="Comment...." ref="commentBody" />
                    </div>
                  </div>
                  <button style={submitStyle} type="submit" className="btn btn-info" value="Post">Share</button>
                </form>
            </div>
        )
    }
});

var MyBlogs = React.createClass({
    render: function(){
        var self = this;
        var blogArray = [];
        var BlogData = this.props.data.map(function(BlogPost){
            blogArray.unshift({_id: BlogPost._id, name: BlogPost.name, subtitle: BlogPost.subtitle, body: BlogPost.body, img: BlogPost.img, comments: BlogPost.comments, date: BlogPost.date});
        });
        var blogsOrdered = blogArray.map(function(BlogPost){
            var showComments = BlogPost.comments.map(function(comment){
                
                var userImg = {
                    width: 40
                }
                
                var commentBody = {
                    paddingLeft: 10
                }
                
                var commentHolder = {
                    marginBottom: 10,
                    marginLeft: 30
                }
                
                if (BlogPost.comments){       
                    return(
                            <li style={commentHolder}>
                                <div className="row vertical-center">
                                    <div className="col-md-1">
                                        <img style={userImg} src="img/headshot1.jpg" className="img-responsive img-circle"></img>
                                    </div>
                                    <div className="col-md-11">
                                        <h4>{comment.user}</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-11 col-md-offset-1">
                                        <p style={commentBody}>{comment.body}</p>
                                    </div>
                                </div>
                            </li>
                        )
                } 
            });
            
            if (showComments.length === 0){
                showComments = null;
            }  
            
            var postCommentStyle = {
                marginBottom: 75
            }
            
            var subtitleStyle = {
                marginLeft: 10
            }
            
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

            var asDate = new Date(BlogPost.date);

            var asMonth = months[asDate.getMonth()];
            
            return(
                <li className='well list-unstyled blog-content row'> 
                    <div className="row align-top">
                        <div className="col-md-3">
                            <img src="img/headshot1.jpg" className="img-responsive thumbnail"></img>
                        </div>
                        <div className="col-md-9">
                            <h1 className="blog-title"> {BlogPost.name}</h1>
                            <div style={subtitleStyle}>
                                <h1 className="blog-subtitle">{BlogPost.subtitle}</h1>
                                <p>{asMonth.toUpperCase() + " / " + asDate.getDate() + " / " + asDate.getFullYear()}</p>
                            </div>
                            <div className="blogTitle-separator center-block"></div>
                        </div>
                    </div>
                    <div className="blog-body"> {BlogPost.body} </div>
                    <div className="well blog-commentBox">
                        <div style={postCommentStyle}>
                            <PostComment blogId={BlogPost._id} onPost={self.props.newData} numComments={BlogPost.comments.length}/>
                        </div>
                        <div className="blogComment-separator center-block"></div>
                        <div className="blog-comments">
                            <ul className="list-unstyled">{showComments}</ul>
                        </div>
                    </div>
                </li>
            )
        })
        
        return(
            <div>
                <ul>
                    {blogsOrdered}
                </ul>
            </div>
        )
    }
});


var BlogBox = React.createClass({
    
    render: function(){
        
        var self = this;
        var divStyle = {
            marginTop: 50
        };
        var doRefresh = function(){
            self.props.loadBlogsFromServer();
        };
        
        return (
        <div>
            <div style={divStyle}>
                <ul>
                    <div className="col-md-10">
                        <MyBlogs data={this.props.data} newData={doRefresh}/>
                    </div>
                    <div className="col-md-2 shareBar">
                        <StickyDiv offsetTop={20}><SocialBar/></StickyDiv>
                    </div>
                </ul>
            </div>
        </div>
        );
    }
});

var BlogBuilder = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var blogName = React.findDOMNode(this.refs.newName).value.trim();
        var blogSubtitle = React.findDOMNode(this.refs.newSubtitle).value.trim();
        var blogBody = React.findDOMNode(this.refs.newBody).value.trim();
        console.log();
       
        var data = ({name: blogName, subtitle: blogSubtitle, content: blogBody});
    
        if (!blogName || !blogSubtitle || !blogBody) {
          return;
        };
        
        var self = this;
        
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data: data,
          success: function(data) {
            self.props.loadBlogsFromServer();
            console.log(data);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });

        // TODO: send request to the server
        React.findDOMNode(this.refs.newName).value = '';
        React.findDOMNode(this.refs.newSubtitle).value = '';
        React.findDOMNode(this.refs.newBody).value = '';
        return;
  },
    
    render: function() {

        var divStyle2 = {
            marginTop: 50,
            marginBottom: 50,
        };
        
        return (
            <div className={divStyle2}>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>BLOG TITLE</label>
                    <input type="text" className="form-control" placeholder="title goes here" ref="newName" />
                  </div>
                  <div className="form-group">
                    <label>BLOG SUBTITLE</label>
                    <input type="text" className="form-control" placeholder="subtitle goes here" ref="newSubtitle" />
                  </div>
                  <div className="form-group">
                    <label>BLOG CONTENT</label>
                    <textarea type="text" className="form-control" placeholder="content goes here" ref="newBody" />
                  </div>
                  <button type="submit" className="btn btn-default" value="Post">Submit</button>
                </form>
            </div>
          );
    }
});

var RenderBlogs = React.createClass({
    
    getInitialState: function(){
        return {data: []};
    },
    
    loadBlogsFromServer: function(){
        $.ajax({
            url: '/api/blog',
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log('broken URL is ' + this.props.url)
                console.error(this.props.url, status, err.toString)
            }.bind(this)
        });
    },
    
    componentDidMount: function(){
        this.loadBlogsFromServer();
    },
    
    
    render: function(){
        var divStyle = {
            marginTop: 50,
            marginBottom: 50,
            backgroundColor: '#3794bf'
        };
        var divStyle2 = {
            marginTop: 100,
            marginBottom: 50,
        };
        var divStyle3 = {
            color: '#03A9F4',
            fontWeight: 300
        };
        var divStyle4 = {
            fontWeight: 900,
            paddingLeft: 20,
            paddingRight: 20
        };
        var containerStyle = {
            marginRight: 50
        };
        var textStyle = {
            color: '#f15922'
        };
        var pageSubtitle ={
            color: 'rgba(120, 120, 123, 0.83)',
            marginTop: 30
        }
        
        return (
        <div>    
            <div className='container-fluid'>
                <div className='container text-center' style={divStyle2}>
                    <h1><span style={divStyle3}>[</span><span style={divStyle4}>    BLOG    </span><span style={divStyle3}>]</span></h1>
                    <h3 style={pageSubtitle}>    A Curated Selection of Recent Musings    </h3>
                </div>
                <div style={containerStyle}>
                    <BlogBox data={this.state.data} loadBlogsFromServer={this.loadBlogsFromServer}/>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='container text-center'>
                    <h1> SUBMIT A BLOG</h1>
                </div>
                <div className='container'>
                    <div className={divStyle2}>
                        <BlogBuilder url='/api/blog/' loadBlogsFromServer={this.loadBlogsFromServer}/>
                    </div>
                    <div style={divStyle2}/>
                </div>
            </div>
        </div>
        );
    }
});


module.exports = RenderBlogs;