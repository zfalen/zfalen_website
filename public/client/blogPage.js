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
        
        $.ajax({
          url: commentUrl,
          dataType: 'json',
          type: 'POST',
          data: data,
          success: function(data) {
            console.log(data);
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
            width: '98%',
            marginLeft: '2%'
        }
        
        var submitStyle = {
            float: 'right'
        }
        
        var formStyle = {
            paddingTop: '15px'
        }
        
        return(
            <div className="well" style={commentBoxStyle}>
                <div className="blog-commentsCounter">
                    <h3 className="blog-commentsCounterText"> 8 Comments </h3>
                </div>
                <form style={formStyle} onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input style={userStyle} type="text" className="form-control" placeholder="Username" ref="commentUser" />
                  </div>
                  <div className="form-group">
                    <input style={commentStyle} type="text" className="form-control" placeholder="Comment...." ref="commentBody" />
                  </div>
                  <button style={submitStyle} type="submit" className="btn btn-default" value="Post">Share</button>
                </form>
            </div>
        )
    }
});

var MyBlogs = React.createClass({
    render: function(){
        var blogArray = [];
        var BlogData = this.props.data.map(function(BlogPost){
            blogArray.unshift({_id: BlogPost._id, name: BlogPost.name, subtitle: BlogPost.subtitle, body: BlogPost.body, img: BlogPost.img, comments: BlogPost.comments, date: BlogPost.date});
        });
        var blogsOrdered = blogArray.map(function(BlogPost){
            var showComments = BlogPost.comments.map(function(comment){
                if (BlogPost.comments){       
                    return(
                            <li>
                                <h5>{comment.user}</h5>
                                <p>{comment.body}</p>
                            </li>
                        )
                } 
            });
            
            if (showComments.length === 0){
                showComments = (
                    <li><p> No Comments Yet... </p></li>
                )
            }
        
            return(
                <li className='well list-unstyled blog-content row'> 
                    <div className="row align-top">
                        <div className="col-md-3">
                            <img src="img/headshot1.jpg" className="img-responsive thumbnail"></img>
                        </div>
                        <div className="col-md-9">
                            <h1 className="blog-title"> {BlogPost.name}</h1>
                            <h1 className="blog-subtitle">{BlogPost.subtitle}</h1>
                        </div>
                    </div>
                    <div className="blog-body"> </div>
                    <PostComment blogId={BlogPost._id}/>
                    <div className="blog-comments">
                        <ul>{showComments}</ul>
                    </div>
                </li>
            )
        })
        
        var blogStyle = {
            width: '75%'
        }
        return(
            <div>
                <ul style={blogStyle}>
                    {blogsOrdered}
                </ul>
            </div>
        )
    }
});

var BlogBox = React.createClass({
    
    getInitialState: function(){
        return {data: []};
    },
    
    loadBlogsFromServer: function(){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data){
                console.log('inside succces!')
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
        setInterval(this.loadBlogsFromServer, this.props.pollInterval);
    },
    
    render: function(){
        var divStyle = {
            marginTop: 50
        };
        return (
        <div>
            <div style={divStyle}>
                <ul>
                    <MyBlogs data={this.state.data}/>
                </ul>
            </div>
        </div>
        );
    }
});

var BlogBuilder = React.createClass({
    handleSubmit: function(e) {
        console.log("HI DOUG");
        e.preventDefault();
        var blogName = React.findDOMNode(this.refs.newName).value.trim();
        var blogSubtitle = React.findDOMNode(this.refs.newSubtitle).value.trim();
       
        var data = ({name: blogName, subtitle: blogSubtitle});
    
        if (!blogName || !blogSubtitle) {
          return;
        };
        
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data:data,
          success: function(data) {
            console.log(data);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });

        // TODO: send request to the server
        React.findDOMNode(this.refs.newName).value = '';
        React.findDOMNode(this.refs.newSubtitle).value = '';
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
                    <label>BLOG CONTENT</label>
                    <input type="text" className="form-control" placeholder="content goes here" ref="newSubtitle" />
                  </div>
                  <button type="submit" className="btn btn-default" value="Post">Submit</button>
                </form>
            </div>
          );
    }
});

var RenderBlogs = React.createClass({
    
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
        return (
        <div>    
            <div className='container-fluid'>
                <div className='container text-center' style={divStyle2}>
                    <h1><span style={divStyle3}>[</span><span style={divStyle4}>    BLOG    </span><span style={divStyle3}>]</span></h1>
                </div>
                <div style={containerStyle}>
                    <BlogBox url='/api/blog/' pollInterval={2000}/>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='container text-center'>
                    <h1> SUBMIT A BLOG</h1>
                </div>
                <div className='container'>
                    <div className={divStyle2}>
                        <BlogBuilder url='/api/blog/'/>
                    </div>
                    <div style={divStyle2}/>
                </div>
            </div>
        </div>
        );
    }
});
